import { SentiSynthConfig } from './parser.js';

/**
 * Extracts dependency node names from a field's value.
 * Looks for `ref(EntityName.fieldName)`
 */
export function extractDependencies(fieldValue: string): string[] {
    const refRegex = /ref\(([^.]+)\.[^)]+\)/g;
    const deps: string[] = [];
    let match;
    while ((match = refRegex.exec(fieldValue)) !== null) {
        deps.push(match[1]);
    }
    return deps;
}

/**
 * Validates and orders entities based on their `ref()` dependencies.
 * Uses Topological Sort (Depth-First Search) to ensure parents are generated before children.
 * Throws an error if a circular dependency is detected.
 */
export function resolveDependencies(config: SentiSynthConfig): string[] {
    const graph = new Map<string, string[]>();

    // Build the graph
    for (const entityName of Object.keys(config)) {
        if (entityName === 'llmCategories') continue;

        const entityDef = (config as any)[entityName];
        if (!entityDef || typeof entityDef !== 'object' || Array.isArray(entityDef)) continue;

        const deps = new Set<string>();

        const fields = entityDef.fields || {};
        for (const fieldKey of Object.keys(fields)) {
            const fieldDef = fields[fieldKey];
            if (typeof fieldDef === 'string') {
                extractDependencies(fieldDef).forEach(d => deps.add(d));
            } else if (fieldDef && typeof fieldDef === 'object' && fieldDef.type) {
                extractDependencies(fieldDef.type).forEach(d => deps.add(d));
            }
        }

        graph.set(entityName, Array.from(deps));
    }

    // Topological Sort
    const visited = new Set<string>();
    const visiting = new Set<string>();
    const order: string[] = [];

    function visit(node: string) {
        if (visiting.has(node)) {
            throw new Error(`Circular dependency detected involving entity: ${node}`);
        }
        if (visited.has(node)) {
            return;
        }

        visiting.add(node);

        const deps = graph.get(node) || [];
        for (const dep of deps) {
            if (!graph.has(dep)) {
                throw new Error(`Entity '${node}' depends on unknown entity '${dep}'`);
            }
            visit(dep);
        }

        visiting.delete(node);
        visited.add(node);
        order.push(node);
    }

    for (const node of graph.keys()) {
        if (!visited.has(node)) {
            visit(node);
        }
    }

    return order; // Order guarantees dependencies come before dependents
}
