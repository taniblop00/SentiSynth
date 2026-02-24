import { faker } from '@faker-js/faker';
import { generateDynamicQA, QAPair } from './qa-data.js';
import { SentiSynthConfig } from '../core/parser.js';

let lastGeneratedRowIndex = -1;
let currentQAPair: QAPair | null = null;

function getQAPairForRow(rowIndex: number, categories?: string[]): QAPair {
    // If we're on the same row, reuse the pair so Question and Answer match contextually!
    if (rowIndex === lastGeneratedRowIndex && currentQAPair) {
        return currentQAPair;
    }
    // New row, generate a new random pair
    currentQAPair = generateDynamicQA(categories);
    lastGeneratedRowIndex = rowIndex;
    return currentQAPair;
}

/**
 * Registry used by `ref(entity.field)`
 * Stores the generated single column data (e.g. Map<"Users", [1, 2, 3...]>)
 */
export const generationRegistry = new Map<string, any[]>();

/**
 * Register a generated column for dependencies.
 */
export function registerColumnData(entity: string, field: string, data: any[]) {
    generationRegistry.set(`${entity}.${field}`, data);
}

/**
 * Fetches exactly one randomly picked value from a previously generated dependency.
 */
export function getRefValue(refString: string): any {
    // Extract "Users.id" from "ref(Users.id)"
    const match = refString.match(/ref\(([^)]+)\)/);
    if (!match) throw new Error(`Invalid ref format: ${refString}`);

    const key = match[1];
    const registeredData = generationRegistry.get(key);

    if (!registeredData || registeredData.length === 0) {
        throw new Error(`Referenced data '${key}' not found or empty (dependency generation failed)`);
    }

    // Pick a random value from the array
    const randomIndex = Math.floor(Math.random() * registeredData.length);
    return registeredData[randomIndex];
}

/**
 * Fuzzy matching logic to guess the Faker.js method from a column name
 */
export function inferFakerMethod(fieldName: string): string {
    const name = fieldName.toLowerCase();

    if (name.includes('uuid') || name === 'id') return 'string.uuid';
    if (name.includes('email') || name.includes('mail')) return 'internet.email';
    if (name.includes('first_name') || name.includes('firstname')) return 'person.firstName';
    if (name.includes('last_name') || name.includes('lastname')) return 'person.lastName';
    if (name.includes('name')) return 'person.fullName';
    if (name.includes('phone')) return 'phone.number';
    if (name.includes('address') || name.includes('street')) return 'location.streetAddress';
    if (name.includes('city')) return 'location.city';
    if (name.includes('country')) return 'location.country';
    if (name.includes('zip') || name.includes('postal')) return 'location.zipCode';
    if (name.includes('company')) return 'company.name';
    if (name.includes('date') || name.includes('created_at')) return 'date.past';
    if (name.includes('price') || name.includes('cost') || name.includes('amount')) return 'finance.amount';
    if (name.includes('url') || name.includes('website')) return 'internet.url';
    if (name.includes('ip')) return 'internet.ipv4';
    if (name.includes('desc') || name.includes('description') || name.includes('body')) return 'lorem.paragraph';
    if (name.includes('status') || name.includes('state')) return 'word.sample';

    // Fallbacks based on typical types
    if (name.startsWith('is_') || name.startsWith('has_')) return 'datatype.boolean';

    return 'string.alphanumeric'; // Ultimate fallback
}

/**
 * Execute a string faker method path like `internet.email`
 */
export function executeFakerMethod(methodPath: string): any {
    const parts = methodPath.split('.');
    if (parts.length === 2) {
        const [module, method] = parts;
        const moduleMap = (faker as any)[module];
        if (moduleMap && typeof moduleMap[method] === 'function') {
            return moduleMap[method](); // Call `faker.internet.email()`
        }
    }

    // Fallback if the strict method isn't found
    return faker.string.alphanumeric({ length: { min: 5, max: 10 } });
}

/**
 * Top level generator resolver
 * Resolves standard types, explicitly named faker types, inferred fields, and refs
 */
export function generateValue(fieldName: string, fieldTypeStr?: string | null, rowIndex: number = 0, config?: SentiSynthConfig): any {
    // If no type string is provided, use smart inference based on the field name
    if (fieldTypeStr == null || fieldTypeStr === '') {
        const inferredMethod = inferFakerMethod(fieldName);
        return executeFakerMethod(inferredMethod);
    }

    const typeStr = String(fieldTypeStr).trim();

    // Explicit ref() type
    if (typeStr.startsWith('ref(')) {
        return getRefValue(typeStr);
    }

    // Explicit faker.method (e.g., faker.internet.email)
    if (typeStr.startsWith('faker.')) {
        return executeFakerMethod(typeStr.replace('faker.', ''));
    }

    // Basic explicit types
    switch (typeStr.toLowerCase()) {
        case 'string': return faker.string.alphanumeric(10);
        case 'number': return faker.number.int({ min: 1, max: 10000 });
        case 'boolean': return faker.datatype.boolean();
        case 'uuid': return faker.string.uuid();
        case 'llm_system_prompt': {
            const pair = getQAPairForRow(rowIndex, config?.llmCategories);
            return pair.system_prompt || 'You are a helpful AI assistant.';
        }
        case 'llm_question': {
            const pair = getQAPairForRow(rowIndex, config?.llmCategories);
            return pair.question;
        }
        case 'llm_answer': {
            const pair = getQAPairForRow(rowIndex, config?.llmCategories);
            return pair.answer;
        }
    }

    // Final fallback
    return faker.string.alphanumeric(10);
}
