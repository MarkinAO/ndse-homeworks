const fs = require('fs')

fs.readdir('./logs/', (err, logs) => {
    if(err) throw new Error(err)    
    
    let result = {
        allGames: null,
        winGames: null,
        loseGames: null,
        percentWin: () => {
            return Math.round(result.winGames / result.allGames * 100) + '%'
        }
    }
    
    logs.forEach(file => {
        fs.readFile('./logs/' + file, 'utf-8', (err, data) => {
            if(err) throw new Error(err)
            let res = data.split('\n')            
    
            result.allGames += res.length - 2
            if(res[res.length - 2].includes('Игра завершена')) result.allGames -= 1            
    
            result.winGames += res.filter(el => {
                if(el.includes('Угадал')) {
                    return true
                }
            }).length
    
            result.loseGames += res.filter(el => {
                if(el.includes('Не угадал')) {
                    return true
                }                
            }).length

            if(file === logs[logs.length - 1]) {
                const str = '***\nСтатистика:\nВсего игр: ' + result.allGames + '\nВыиграно/проиграно: ' + result.winGames + '/' + result.loseGames + '\nПроцент побед: ' + result.percentWin() + '\n***'
                console.log(str)
            }           
        })        
    });
})
