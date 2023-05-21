const http = require('http')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { myAPIKey } = require('./config.js')

const argv = yargs(hideBin(process.argv)).argv
const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${argv._[0]}`    

http.get(url, (res) => {
    const {statusCode} = res
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`)
        return
    }

    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
        let parseData = JSON.parse(rowData)
        console.log(parseData)
    })
}).on('error', (err) => {
    console.error(err)
})