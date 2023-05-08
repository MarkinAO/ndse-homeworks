#!/usr/bin/env node
const readline = require('readline')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const path = require('path')
const fs = require('fs')

const dir = path.join(__dirname, 'logs')

fs.mkdir(dir, (err) => {    
})

const fileName = yargs(hideBin(process.argv)).argv._[0] + '.txt'
const file = path.join(__dirname, 'logs', fileName)

const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
)

let result
fs.writeFile(file, 'Результаты игр от ' + new Date().toLocaleDateString() + ':\n', (err) => {
    if(err) throw new Error(err)
})

function writeLog(data) {
    const time = new Date().toLocaleTimeString()
    fs.appendFile(file, time + ': ' + data + '\n', (err) => {
        if(err) throw new Error(err)
    })
}

function game(answer) {
    if(answer === 'exit') {
        rl.close()
    } else {
        const randomNumber = Math.round(Math.random()) + 1
        if(Number(answer) === randomNumber) {
            result = `Угадал это ${randomNumber}`
            console.log(result)
            writeLog(result)

            rl.question('Давай ещё разок!? (Для завершения введите exit) ', (answer) => {
                if(answer === 'exit') {
                    writeLog('Игра завершена')
                    rl.close()
                } else {
                    game(answer)
                }
            })
        } else {
            result = `Не угадал это ${randomNumber}`
            console.log(result)
            writeLog(result)

            rl.question('Давай ещё разок!? (Для завершения введите exit) ', (answer) => {
                if(answer === 'exit') {
                    writeLog('Игра завершена')
                    rl.close()
                } else {
                    game(answer)
                }            
            })
        }
    }    
}

if(fileName !== 'undefined.txt') rl.question('Загадано число 1 или 2. Твой вариант? ', (answer) => game(answer))

module.exports = {
    file
}
