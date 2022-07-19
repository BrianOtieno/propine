import moment from 'moment'
import chalk from 'chalk';

export const isValidDate = (date) => {
    if (moment(date).isValid()) {
        return true;
    } else {
        console.log(chalk.hex('#DEADED').bold(date + ' is an invalid Date'));
        return false;
    }
}