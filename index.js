const fs = require('fs');
const walk = require('walk');
const commandLineArgs = require('command-line-args')

// get command line argument if no shame factor given use 5 as default shame factor
const optionDefinitions = [
  { name:'shameThreshold', alias:'t', type:Number, defaultOption: true ,defaultValue : 5 }];
const options = commandLineArgs(optionDefinitions)
const shameThreshold = options.shameThreshold;

console.log('Your shame threshold is', shameThreshold)

// Read list of files in .gitignore


let files   = [];

// Traverse all the folders in present dir and get their list 
const walker  = walk.walk('./', { followLinks: false });
walker.on('file', (root, stat, next)=> {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
    next();
});

walker.on('end', function() {
    // console.log(files);
});