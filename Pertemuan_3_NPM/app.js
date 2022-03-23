const validator = require('validator')
const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// console.log('hello world !')
console.log(validator.isEmail('josrel@gmail.com'))

if(validator.isEmail('cjosrel@gmail.c') == true) {
    console.log('benar')
} else{
    console.log('salah')
}
console.log(validator.isMobilePhone('0812345678','id-ID'));

rl.question('nama anda : ',(nama) =>{
    rl.question('nomor hp : ', (noHP) => {
        rl.question('email : ', (email) => {
            console.log(`nama anda : ${nama}`)
            if(validator.isMobilePhone(noHP) == true){
                console.log(`nomor HP : ${noHP}`)
            }else{
                console.log('no hp anda salah')
            }
            if(validator.isEmail(email) == true){
                console.log(`email : ${email}`)
            }else{
                console.log('email salah ')
            }
        })
    })
})