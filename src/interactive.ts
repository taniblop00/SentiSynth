import inquirer from 'inquirer';
import chalk from 'chalk';
import { SentiSynthConfig } from './core/parser.js';
import { QA_CATEGORIES } from './generators/qa-data.js';
import { renderHeader } from './ui/index.js';

const basicEcommerceConfig: SentiSynthConfig = {
    users: {
        rows: 50,
        fields: {
            id: "uuid",
            first_name: "faker.person.firstName",
            last_name: "faker.person.lastName",
            email: "string", // will smart infer to internet.email
            created_at: "date"
        }
    },
    orders: {
        rows: 150,
        fields: {
            id: "uuid",
            user_id: "ref(users.id)",
            total_amount: "number",
            status: "faker.word.sample"
        }
    }
};

const socialMediaConfig: SentiSynthConfig = {
    users: {
        rows: 100,
        fields: {
            id: "uuid",
            username: "faker.internet.username",
            bio: "faker.lorem.sentence",
            joined_at: "date"
        }
    },
    posts: {
        rows: 500,
        fields: {
            id: "uuid",
            author_id: "ref(users.id)",
            content: "faker.lorem.paragraph",
            likes_count: "number"
        }
    }
};

const llmTrainingConfig: SentiSynthConfig = {
    qa_dataset: {
        rows: 500,
        fields: {
            id: "uuid",
            system_prompt: "llm_system_prompt",
            user_question: "llm_question",
            ai_answer: "llm_answer",
            category: "faker.word.sample",
            created_at: "date"
        }
    }
};

const commonFieldsPrompt = [
    { name: 'ID (uuid) - Unique identifier', value: { name: 'id', type: 'uuid' }, checked: true },
    { name: 'First Name', value: { name: 'first_name', type: 'faker.person.firstName' } },
    { name: 'Last Name', value: { name: 'last_name', type: 'faker.person.lastName' } },
    { name: 'Email Address', value: { name: 'email', type: 'faker.internet.email' } },
    { name: 'Phone Number', value: { name: 'phone', type: 'faker.phone.number' } },
    { name: 'Date / Time', value: { name: 'created_at', type: 'date' } },
    { name: 'Price or Amount', value: { name: 'amount', type: 'number' } },
    { name: 'Status (e.g. pending, completed)', value: { name: 'status', type: 'faker.word.sample' } },
    { name: 'Description Note', value: { name: 'description', type: 'faker.lorem.paragraph' } },
    { name: 'LLM System Prompt (Role/Persona)', value: { name: 'system_prompt', type: 'llm_system_prompt' } },
    { name: 'LLM User Question (High Quality)', value: { name: 'user_question', type: 'llm_question' } },
    { name: 'LLM AI Answer (High Quality)', value: { name: 'ai_answer', type: 'llm_answer' } }
];

export async function runInteractiveWizard(): Promise<SentiSynthConfig | null> {
    renderHeader();

    console.log(chalk.cyanBright.bold('Welcome to the SentiSynth Easy Wizard! ✨\n'));

    const { mode } = await inquirer.prompt([
        {
            type: 'list',
            name: 'mode',
            message: 'What kind of fake data do you want to create?',
            choices: [
                { name: '🚀 Quick Start: Online Store (Users + Orders)', value: 'ecommerce' },
                { name: '📱 Quick Start: Social App (Users + Posts)', value: 'social' },
                { name: '🤖 Quick Start: LLM Instruct-Tuning Dataset (Infinite Q&A)', value: 'llm' },
                { name: '🛠️  Custom Mode: Build my own list step-by-step', value: 'custom' },
                { name: '❌ Cancel', value: 'cancel' }
            ]
        }
    ]);

    if (mode === 'cancel') {
        console.log(chalk.yellow('Wizard cancelled.'));
        return null;
    }

    // Helper to prompt for LLM categories
    const promptForLLMCategories = async () => {
        const choices = Object.entries(QA_CATEGORIES).map(([key, label]) => ({
            name: label,
            value: key,
            checked: true // Select all by default
        }));

        const { categories } = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'categories',
                message: 'Which Q&A topics do you want to include?',
                choices: choices,
                validate: (answers) => answers.length > 0 ? true : chalk.red('Select at least one category!')
            }
        ]);
        return categories;
    };

    if (mode === 'ecommerce') return { ...basicEcommerceConfig };
    if (mode === 'social') return { ...socialMediaConfig };
    if (mode === 'llm') {
        const selectedCategories = await promptForLLMCategories();
        // Return a fresh copy to avoid mutating the shared global object between runs
        const freshLlmConfig: SentiSynthConfig = {
            qa_dataset: {
                rows: 500,
                fields: {
                    id: "uuid",
                    system_prompt: "llm_system_prompt",
                    user_question: "llm_question",
                    ai_answer: "llm_answer",
                    category: "faker.word.sample",
                    created_at: "date"
                }
            },
            llmCategories: selectedCategories
        };
        return freshLlmConfig;
    }

    // Custom Mode
    const config: SentiSynthConfig = {};
    const currentEntities: string[] = [];

    let addingEntities = true;

    while (addingEntities) {
        console.log(chalk.magentaBright(`\n--- Step ${currentEntities.length + 1}: Name your data list ---`));

        const { entityName, rowCount } = await inquirer.prompt([
            {
                type: 'input',
                name: 'entityName',
                message: 'What should we call this list? (e.g. "users", "products", "games")',
                validate: (input) => input && input.trim().length > 0 ? true : 'The name cannot be empty.'
            },
            {
                type: 'input',
                name: 'rowCount',
                message: 'How many fake records (rows) do you want to create here?',
                default: '100',
                validate: (input) => {
                    const n = parseInt(input, 10);
                    return (!isNaN(n) && n > 0) ? true : 'Please enter a valid number higher than 0.';
                },
                filter: (input: string) => {
                    const n = parseInt(input, 10);
                    return isNaN(n) ? 100 : n;
                }
            }
        ]);

        const formattedEntityName = entityName.trim().toLowerCase();

        // Choose common fields
        const { selectedFields } = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'selectedFields',
                message: 'Which columns do you want to include?\n  (Use <Space> to select, <Enter> to confirm)',
                choices: commonFieldsPrompt,
                validate: (answers) => answers.length > 0 ? true : chalk.red('You must press <Space> to select at least one column!')
            }
        ]);

        const fieldsObj: Record<string, string> = {};
        let needsLlmCategories = false;

        for (const f of selectedFields) {
            fieldsObj[f.name] = f.type;
            if (f.type.startsWith('llm_')) {
                needsLlmCategories = true;
            }
        }

        if (needsLlmCategories && !config.llmCategories) {
            console.log(chalk.cyan('\nYou selected an LLM field. Lets configure the topics!'));
            config.llmCategories = await promptForLLMCategories();
        }

        // Advanced: Add Relationship?
        if (currentEntities.length > 0) {
            const { addRelation } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'addRelation',
                    message: 'Should this list connect to another list we already made? (e.g. Orders belong to Users)',
                    default: false
                }
            ]);

            if (addRelation) {
                const { targetEntity, foreignKeyName } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'targetEntity',
                        message: 'Which list does this depend on?',
                        choices: currentEntities
                    },
                    {
                        type: 'input',
                        name: 'foreignKeyName',
                        message: 'What should we call the connection column? (e.g. "user_id")',
                        default: (answers: any) => `${answers.targetEntity}_id`
                    }
                ]);

                // Target format: ref(users.id) 
                // Assuming primary key is always 'id' for the wizard simplicity.
                fieldsObj[foreignKeyName] = `ref(${targetEntity}.id)`;
            }
        }

        config[formattedEntityName] = {
            rows: rowCount,
            fields: fieldsObj
        };
        currentEntities.push(formattedEntityName);

        const { continueAdding } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'continueAdding',
                message: 'Great! Do you want to create another list of data?',
                default: false
            }
        ]);

        addingEntities = continueAdding;
    }

    console.log(chalk.greenBright.bold('\n✅ Data template ready! Generating files now...\n'));
    return config;
}
