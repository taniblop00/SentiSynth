import { z } from 'zod';
import { parse as parseYaml } from 'yaml';
import * as fs from 'fs/promises';

// Define the schema for a single field in an entity
export const FieldSchema = z.object({
    type: z.string().optional(), // 'uuid', 'string', 'number', 'boolean', 'faker.method', 'ref(entity.id)'
    unique: z.boolean().optional(),
    nullable: z.boolean().optional(),
});

export type FieldDefinition = z.infer<typeof FieldSchema>;

// Define the schema for an entity (table)
export const EntitySchema = z.object({
    rows: z.number().int().positive().default(100), // Number of rows to generate
    fields: z.record(z.string(), FieldSchema.or(z.string())), // Allow short string form or full object form
});

export type EntityDefinition = z.infer<typeof EntitySchema>;

// The top-level configuration format
export const SentiSynthConfigSchema = z.record(z.string(), EntitySchema);

export type SentiSynthConfig = z.infer<typeof SentiSynthConfigSchema> & {
    /** Optional metadata specifically for the LLM Quality Assurance data generator */
    llmCategories?: string[];
};

/**
 * Parses a YAML or JSON string into a validated SentiSynth configuration object.
 */
export function parseConfigString(content: string, isYaml: boolean): SentiSynthConfig {
    let parsedRaw: unknown;

    if (isYaml) {
        parsedRaw = parseYaml(content, {});
    } else {
        parsedRaw = JSON.parse(content);
    }

    if (!parsedRaw || typeof parsedRaw !== 'object') {
        throw new Error('Configuration must be a valid YAML/JSON object.');
    }

    const rawRecord = parsedRaw as Record<string, any>;

    // Keys that are NOT entity definitions (internal metadata)
    const RESERVED_KEYS = new Set(['llmCategories']);

    // Pre-process short forms: convert `field: "type"` to `field: { type: "type" }`
    // Also strip reserved non-entity keys before Zod validation
    const entityRecord: Record<string, any> = {};
    for (const entityKey in rawRecord) {
        if (RESERVED_KEYS.has(entityKey)) continue; // skip metadata keys

        const entity = rawRecord[entityKey];
        if (entity && entity.fields && typeof entity.fields === 'object') {
            for (const fieldKey in entity.fields) {
                if (typeof entity.fields[fieldKey] === 'string') {
                    entity.fields[fieldKey] = { type: entity.fields[fieldKey] };
                }
            }
        }
        entityRecord[entityKey] = entity;
    }

    // Validate strictly against the Zod schema (only entity keys)
    return SentiSynthConfigSchema.parse(entityRecord);
}

/**
 * Loads a configuration from a file path.
 * Throws a Zod error or standard Error if file not found/invalid.
 */
export async function loadConfig(filePath: string): Promise<SentiSynthConfig> {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const isYaml = filePath.endsWith('.yaml') || filePath.endsWith('.yml');
    return parseConfigString(fileContent, isYaml);
}
