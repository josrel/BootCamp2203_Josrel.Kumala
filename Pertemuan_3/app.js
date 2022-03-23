const fs = require ('fs')
const readline = require('readline')

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
})
// console.log(fs)

// fs.writeFileSync('test.txt','Hello World secara sync!')

// fs.readFile('test.txt', 'utf-8', (e, data) => {
//     if (e) throw e
//     console.log(data)
// })

rl.question('nama : ',(nama) => {
    rl.question('no HP : ',(noHP) => {
        rl.question('email : ',(email) => {
            console.log(`nama anda : ${nama}, no hp anda : ${noHP}, email ${email}`)
            rl.close();
        })
    })
})