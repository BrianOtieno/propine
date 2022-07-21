import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

export const header = () => {
    clear();

    console.log(
        chalk.blue.bold(
            figlet.textSync('Propine CLI', { horizontalLayout: 'full' })
        )
    );

    console.log(chalk.green.bold(
        'Welcome to Propine ' +
        chalk.blue.underline.bold('CLI Application') +
        ' where you can make quick Crypto enquiries!'
    ));

    console.log(chalk.green.bold(
        'Below are the  ' +
        chalk.red.underline.bold('Arguments') +
        ' you can pass'
    ));

    console.log(`
        ${chalk.blue.bold('--------------------------------------------------------')}
        ${chalk.yellow('TOKEN :')} ${chalk.red.bold('Example: --token=ETH')}
        ${chalk.yellow('DATE :')} ${chalk.red.bold('Example --date=17-07-2022')}
        ${chalk.yellow('TOKEN & DATE:')} ${chalk.red.bold('Example: --token=ETH --date=17-07-2022')}
        ${chalk.yellow('HELP :')} ${chalk.red.bold('--help')}
        ${chalk.blue.bold('--------------------------------------------------------')}
    `);
}