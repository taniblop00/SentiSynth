#!/usr/bin/env node

import { Command } from 'commander';
import { loadConfig } from './core/parser.js';
import { generateData, OutputFormat } from './core/engine.js';
import { renderHeader, createSpinner, renderErrorBox } from './ui/index.js';
import { ZodError } from 'zod';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { runInteractiveWizard } from './interactive.js';

const program = new Command();

program
    .name('sentisynth')
    .description('High-performance schema-driven synthetic data generator')
    .version('1.0.0');

program
    .command('init')
    .argument('[filename]', 'Name of the configuration file to generate', 'config.yaml')
    .description('Generate a sample SentiSynth configuration file')
    .action((filename) => {
        const sampleConfig = `users:
  rows: 50
  fields:
    id: uuid
    first_name: faker.person.firstName
    last_name: faker.person.lastName
    user_mail: string # Smart-inferred to email
    is_active: boolean
    created_at: date

orders:
  rows: 200
  fields:
    order_id: uuid
    user_id: ref(users.id) # Topologically sorted dependency
    amount: number
    status: faker.word.sample
    shipping_address: location.streetAddress
`;
        fs.writeFileSync(filename, sampleConfig, 'utf-8');
        console.log(`\x1b[32mSuccess: Sample configuration file created at ${filename}\x1b[0m`);
    });

program
    .command('create')
    .description('Launch the interactive SentiSynth wizard to generate data without a config file')
    .option('-o, --output-dir <dir>', 'Output directory for generated files', './out')
    .option('-f, --format <format>', 'Output format: json, jsonl, csv, or sql', 'json')
    .action(async (options) => {
        while (true) {
            try {
                const config = await runInteractiveWizard();
                if (!config) {
                    // User cancelled, break the loop and exit cleanly
                    console.log(chalk.yellowBright('Exiting SentiSynth. Goodbye! 👋'));
                    process.exit(0);
                }

                const format = options.format.toLowerCase() as OutputFormat;
                if (!['json', 'jsonl', 'csv', 'sql'].includes(format)) {
                    renderErrorBox(
                        `Invalid format: ${format}`,
                        'Supported formats are: json, jsonl, csv, sql'
                    );
                    process.exit(1);
                }

                console.log('\nStarting Data Generation...');
                const outPath = options.outputOption || options.outputDir;
                await generateData({
                    config,
                    outputDir: outPath,
                    format
                });

                const absPath = path.resolve(outPath);
                console.log(chalk.greenBright(`\n✅ Data generated successfully into: `) + chalk.cyanBright(absPath));
                console.log(chalk.gray(`Restarting the wizard...\n`));

            } catch (error: any) {
                renderErrorBox(
                    error.message || 'An unexpected error occurred during interactive generation.',
                    'Check your inputs and try again.'
                );
                // On error, let the loop restart so they can try again instead of crashing entirely.
                console.log(chalk.yellow('Restarting wizard in 3 seconds...'));
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        }
    });

program
    .command('generate')
    .description('Generate synthetic data from a YAML or JSON schema')
    .requiredOption('-c, --config <path>', 'Path to the schema config file (.yaml or .json)')
    .option('-o, --output-dir <dir>', 'Output directory for generated files', './out')
    .option('-f, --format <format>', 'Output format: json, jsonl, csv, or sql', 'json')
    .action(async (options) => {
        try {
            renderHeader();

            const spinner = createSpinner('Parsing Schema...').start();
            let config;

            try {
                config = await loadConfig(options.config);
                spinner.succeed('Schema parsed and validated successfully.');
            } catch (parseError: any) {
                spinner.fail('Schema validation failed.');

                let errorMessage = parseError.message;
                if (parseError instanceof ZodError) {
                    // Format Zod error for CLI nicely
                    errorMessage = parseError.issues.map((err: any) => {
                        const path = err.path.join('.');
                        return `- \x1b[31m${path ? path : 'root'}\x1b[0m: ${err.message}`;
                    }).join('\n');
                } else if (typeof parseError.message === 'string' && parseError.message.startsWith('[')) {
                    // Safe fallback if ZodError boolean instance check fails
                    try {
                        const parsed = JSON.parse(parseError.message);
                        if (Array.isArray(parsed)) {
                            errorMessage = parsed.map((err: any) => `- \x1b[31m${err.path?.join('.') || 'root'}\x1b[0m: ${err.message}`).join('\n');
                        }
                    } catch { }
                }

                renderErrorBox(
                    errorMessage,
                    'Ensure your YAML is correctly formatted and matches the expected types.'
                );
                process.exit(1);
            }

            const format = options.format.toLowerCase() as OutputFormat;
            if (!['json', 'jsonl', 'csv', 'sql'].includes(format)) {
                renderErrorBox(
                    `Invalid format: ${format}`,
                    'Supported formats are: json, jsonl, csv, sql'
                );
                process.exit(1);
            }

            console.log('\nStarting Data Generation...');
            const outPath = options.outputOption || options.outputDir;
            await generateData({
                config,
                outputDir: outPath,
                format
            });

            const absPath = path.resolve(outPath);
            console.log(chalk.yellowBright(`\n✅ All files generated successfully into: `) + chalk.cyanBright(absPath));
            console.log(chalk.gray('Press Ctrl+C to exit...'));
            process.stdin.resume();

        } catch (error: any) {
            renderErrorBox(
                error.message || 'An unexpected error occurred during generation.',
                'Check your dependency references (ref(...)) for circular loops or typos.'
            );
            process.exit(1);
        }
    });

program.parse(process.argv);
