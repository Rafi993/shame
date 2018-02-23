const fs = require('fs');
const readline = require('readline');
const commandLineArgs = require('command-line-args')
const ignore = require('ignore')
const chalk = require('chalk');

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
let ig;
let files = {};
let path = process.cwd()
let ignoreLine = [];
let shameList = [];

/**
 * Returns an array of shame from file
 * @param {String} file File name from which to get list of shame
 */
const getShame = file => 
    fs.readFileSync(file, "utf-8")
        .match(/@shame(.*)/g);

// @shame sdfsdfsdf
/**
 * Traverse all the folders in present dir and get their list 
 * @param {String} path Path to navigate
 * @param {Array} files Array to which naviated file names will be pushed
 */
const getFiles = (path, files) => {
    fs.readdirSync(path).forEach(file => {
        let subpath = path + '/' + file;
        if (!ig.ignores(subpath))
            if (fs.lstatSync(subpath).isDirectory()) {
                getFiles(subpath, files);
            } else {
                let fileContent = getShame(path + '/' + file);
                if(fileContent!==null)
                    shameList[file] = fileContent;
            }
    });
}

// Navigate all files and folders except ones in .gitignore
readline.createInterface({
    input: fs.createReadStream('.gitignore'),
    terminal: false
}).on('line', line => {
    ignoreLine.push(line)
}).on('close', () => {
    ig = ignore().add([...ignoreLine, '.git']);
    getFiles(__dirname, files)
    const flatShameList = [].concat.apply([],  Object.keys(shameList)
                            .map(x=>shameList[x]));
    if(flatShameList.length>options.shameThreshold){
        console.log(chalk.bgRed.bold('You have reached shame threshold please reduce please reduce it'));
        Object.keys(shameList).forEach(x=>{
            console.log(chalk.bgBlue(x) +':')
            shameList[x].map(y=>{
                console.log('       '+y)
            })
        })
    } else {
        console.log(chalk.bgGreen(' You are good to go  '))
    }
});