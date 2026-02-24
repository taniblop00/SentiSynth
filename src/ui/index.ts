import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';
import ora from 'ora';
import cliProgress from 'cli-progress';
import Table from 'cli-table3';

/**
 * Renders the high-quality ASCII Art header for the application.
 * Also prints the developer credit.
 */
export function renderHeader(): void {
    console.clear();

    // Render "SENTISYNTH" in a bold font
    const asciiArt = figlet.textSync('SENTISYNTH', {
        font: 'Slant',
        horizontalLayout: 'default',
        verticalLayout: 'default',
    });

    // Print with a vibrant gradient-like color
    console.log(chalk.cyanBright.bold(asciiArt));

    // Print required credits
    console.log(
        chalk.yellowBright.bold(' Developed by: taniblop00 | GitHub: github.com/taniblop00 ')
    );
    console.log(); // Spacing
}

/**
 * Creates and returns an elegant loading spinner.
 */
export function createSpinner(text: string) {
    return ora({
        text,
        color: 'cyan',
        spinner: 'dots',
    });
}

/**
 * Renders a friendly, styled error box with tips.
 */
export function renderErrorBox(message: string, tip?: string): void {
    let content = chalk.redBright.bold(`Error: ${message}\n`);

    if (tip) {
        content += `\n${chalk.dim('💡 Tip:')} ${chalk.italic(tip)}`;
    }

    console.error(
        boxen(content, {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'red',
            title: chalk.bgRed.white.bold(' ERROR '),
            titleAlignment: 'center',
        })
    );
}

/**
 * Creates a high-refresh-rate progress bar for generating data.
 */
export function createProgressBar(): cliProgress.MultiBar {
    return new cliProgress.MultiBar({
        clearOnComplete: false,
        hideCursor: true,
        format: `${chalk.blueBright('{bar}')} | {percentage}% | {value}/{total} Rows | Generating: {entity}`,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
    }, cliProgress.Presets.shades_classic);
}

/**
 * Renders a success summary table showing generated entities and file sizes.
 */
export interface SummaryRow {
    entity: string;
    rowsGenerated: number;
    timeMs: number;
}

export function renderSummaryTable(rows: SummaryRow[], totalSizeInBytes: number, totalTimeMs: number): void {
    console.log();
    const table = new Table({
        head: [
            chalk.cyan('Entity'),
            chalk.cyan('Rows Generated'),
            chalk.cyan('Time (ms)')
        ],
        style: {
            head: [],
            border: ['gray'],
        },
    });

    rows.forEach((row) => {
        table.push([row.entity, row.rowsGenerated.toLocaleString(), row.timeMs]);
    });

    console.log(table.toString());

    const sizeMb = (totalSizeInBytes / (1024 * 1024)).toFixed(2);

    console.log(
        boxen(
            `${chalk.greenBright.bold('Generation Complete!')}\n\n` +
            `Total Entities: ${chalk.white.bold(rows.length)}\n` +
            `Total File Size: ${chalk.cyanBright.bold(`${sizeMb} MB`)}\n` +
            `Total Time: ${chalk.yellowBright.bold(`${(totalTimeMs / 1000).toFixed(2)}s`)}`,
            {
                padding: 1,
                margin: 1,
                borderStyle: 'double',
                borderColor: 'green',
                align: 'center',
            }
        )
    );
}
