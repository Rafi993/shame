// Node libraries
const fs = require('fs'),
    readline = require('readline'),
    path = require('path');

// External libraries
const commandLineArgs = require('command-line-args'),
    ignore = require('ignore'),
    chalk = require('chalk');

// get command line argument if no shame factor given use 5 as default shame factor
const optionDefinitions = [{
    name: 'shameThreshold',
    alias: 't',
    type: Number,
    defaultOption: true,
    defaultValue: 5
}];
const options = commandLineArgs(optionDefinitions)

// global variable declarations
let ig,
    dir_path = process.cwd(),
    ignoreLine = [],
    shameList = [];

/**
 * Returns an array of shame from file
 * @param {String} file File name from which to get list of shame
 */
const getShame = file =>
    fs.readFileSync(file, "utf-8")
    .match(/@shame(.*)/g);

/**
 * Traverse all the folders in present dir and get their list 
 * @param {String} path Path to navigate
 * @param {Array} files Array to which naviated file names will be pushed
 */
const getFiles = (dir_path, files) => {
    fs.readdirSync(path.normalize(dir_path)).forEach(file => {
        let subpath = dir_path + '/' + file;
        if (!ig.ignores(subpath))
            if (fs.lstatSync(subpath).isDirectory()) {
                getFiles(subpath, files);
            } else {
                let fileContent = getShame(dir_path + '/' + file);
                if (fileContent !== null)
                    shameList[file] = fileContent;
            }
    });
}

/**
 *  Checks if the shame threshold has been surpased
 */
const checkShameThreshold = () => {
    ig = ignore().add([...ignoreLine, '.git']);
    getFiles('./', [])
    const flatShameList = [].concat
        .apply([], Object.keys(shameList)
            .map(x => shameList[x]));

    if (flatShameList.length > options.shameThreshold) {
        console.log(chalk.bgRed.bold('You have reached shame threshold please reduce it'));
        Object.keys(shameList).forEach(x => {
            console.log(chalk.bgBlue(x) + ':')
            shameList[x].forEach(y => {
                console.log('       ' + y)
            })
            process.exit()
        })
    } else {
        console.log(chalk.bgGreen(' You are good to go  '))
    }
}

// check if shame threshold is accetable value
if (options.shameThreshold >= 0) {
    // Read gitignore
    var stats = fs.stat('.gitignore', (err, stat) => {
        if (stats && stats.isFile()) {
            readline.createInterface({
                input: fs.createReadStream('.gitignore'),
                terminal: false
            }).on('line', line => {
                ignoreLine.push(line)
            }).on('close', () => {
                checkShameThreshold();
            })
        } else {
            checkShameThreshold();
        }
    })
} else {
    console.log(chalk.bgBlue('In Linux and Mac do sudo rm -r *'))
    console.log(chalk.bgBlue('In Windows do rd /S/Q *'))
    console.log('To get negative shame threshold')
}