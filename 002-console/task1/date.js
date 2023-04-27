#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).argv
let date = new Date()
let delta = argv.year || argv.y || argv.month || argv.m || argv.date || argv.d
if(argv._[0] === 'sub') delta *= -1

if(argv.year || argv.y) {    
    date.setFullYear(date.getFullYear() + delta)    
} else if (argv.month || argv.m) {
    date.setMonth(date.getMonth() + delta)
} else if (argv.date || argv.d) {
    date.setDate(date.getDate() + delta)
}

console.log(date.toISOString())