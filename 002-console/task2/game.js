#!/usr/bin/env node
const readline = require('readline')

const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
)

const randomNumber = Math.round(Math.random() * 100)

function game(answer) {    
    if(Number(answer) === randomNumber) {
        console.log(`Отгадано число ${randomNumber}`)
        rl.close()
    }
    if(Number(answer) > randomNumber) {
        console.log(`Меньше`)
        rl.question('', (answer) => game(answer))
    }
    if(Number(answer) < randomNumber) {
        console.log(`Больше`)
        rl.question('', (answer) => game(answer))
    }
}

rl.question('Загадано число в диапазоне от 0 до 100. Твой вариант?', (answer) => game(answer))
