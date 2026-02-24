import * as fs from 'fs';
import * as path from 'path';
import { SentiSynthConfig } from './parser.js';
import { resolveDependencies } from './dependency-graph.js';
import { generateValue, registerColumnData } from '../generators/type-inference.js';
import { createProgressBar, renderSummaryTable, SummaryRow } from '../ui/index.js';

export type OutputFormat = 'json' | 'jsonl' | 'csv' | 'sql';

export interface EngineOptions {
    config: SentiSynthConfig;
    outputDir: string;
    format: OutputFormat;
}

export async function generateData(options: EngineOptions) {
    const { config, outputDir, format } = options;
    const startMs = Date.now();

    // Ensure output directory exists
    await fs.promises.mkdir(outputDir, { recursive: true });

    // 1. Resolve Dependency Order (Topological Sort)
    const executionOrder = resolveDependencies(config);

    // 2. Setup Progress Bars
    const multiBar = createProgressBar();
    const progressBars = new Map();
    let totalRows = 0;

    for (const entity of executionOrder) {
        const rows = (config[entity] as any)?.rows || 100;
        progressBars.set(entity, multiBar.create(rows, 0, { entity }));
        totalRows += rows;
    }

    const summaries: SummaryRow[] = [];
    let totalSizeInBytes = 0;

    // 3. Process each entity sequentially honoring dependencies
    for (const entityName of executionOrder) {
        const entityStartMs = Date.now();
        const entityDef = (config as any)[entityName];

        // Skip non-entity keys (e.g. llmCategories metadata)
        if (!entityDef || typeof entityDef !== 'object' || Array.isArray(entityDef)) continue;

        const rowCount = (entityDef.rows && typeof entityDef.rows === 'number') ? entityDef.rows : 100;
        const bar = progressBars.get(entityName);

        const filePath = path.join(outputDir, `${entityName}.${format}`);
        const stream = fs.createWriteStream(filePath, { encoding: 'utf-8' });

        // Track IDs generated to resolve dependencies for children later
        // In a massive system, this could cause memory pressure if refs are millions of rows,
        // but we only track columns that might be referenced (specifically 'id' for now)
        const idRegistry: any[] = [];
        const entityFields = (entityDef.fields && typeof entityDef.fields === 'object' && !Array.isArray(entityDef.fields))
            ? entityDef.fields
            : {};
        let hasIdField = Object.keys(entityFields).includes('id');

        // Header Writing
        const fieldNames = Object.keys(entityFields);
        if (format === 'json') stream.write('[\n');
        else if (format === 'csv') stream.write(`${fieldNames.join(',')}\n`);
        // SQL doesn't need a single header block, written per line or batch

        // --- Streaming Rows ---
        for (let i = 0; i < rowCount; i++) {
            const rowData: Record<string, any> = {};

            const fields = entityFields;
            for (const fieldName of Object.keys(fields)) {
                const fieldDef = fields[fieldName];
                const fieldType = typeof fieldDef === 'string' ? fieldDef : fieldDef.type;
                const value = generateValue(fieldName, fieldType, i, config);
                rowData[fieldName] = value;

                // Only cache 'id' for ref(...) usage. Assuming ID is the primary key.
                if (fieldName === 'id') {
                    idRegistry.push(value);
                }
            }

            // Output formatting
            let line = '';
            if (format === 'json') {
                const formattedItem = JSON.stringify(rowData, null, 2)
                    .split('\n')
                    .map(l => '  ' + l)
                    .join('\n');
                line = formattedItem + (i < rowCount - 1 ? ',\n' : '\n');
            } else if (format === 'jsonl') {
                line = JSON.stringify(rowData) + '\n';
            } else if (format === 'csv') {
                line = fieldNames.map(f => rowData[f]).join(',') + '\n';
            } else if (format === 'sql') {
                const keys = fieldNames.join(', ');
                const values = fieldNames.map(f => {
                    const v = rowData[f];
                    return typeof v === 'string' ? `'${v.replace(/'/g, "''")}'` : v;
                }).join(', ');
                line = `INSERT INTO ${entityName} (${keys}) VALUES (${values});\n`;
            }

            // Using streams prevents buffering whole multi-GB JSON payloads in memory
            const canContinue = stream.write(line);
            if (!canContinue) {
                await new Promise(resolve => stream.once('drain', resolve));
            }

            bar.increment();
        }

        if (format === 'json') stream.write(']\n');

        // Finalize Stream
        await new Promise<void>((resolve, reject) => {
            stream.end((err?: Error | null) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // We only register the column globally once generation finishes
        if (hasIdField) {
            registerColumnData(entityName, 'id', idRegistry);
        }

        const fileStat = await fs.promises.stat(filePath);
        totalSizeInBytes += fileStat.size;

        summaries.push({
            entity: entityName,
            rowsGenerated: rowCount,
            timeMs: Date.now() - entityStartMs
        });
    }

    multiBar.stop();

    renderSummaryTable(summaries, totalSizeInBytes, Date.now() - startMs);
}
