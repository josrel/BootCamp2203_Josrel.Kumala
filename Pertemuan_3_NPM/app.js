const validator = require('validator')
const readline = require('readline')
const { rejects } = require('assert');
const { resolve } = require('path');
const Promise = require('promise')
const fs = require('fs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// console.log('hello world !')
// console.log(validator.isEmail('josrel@gmail.com'))

// if(validator.isEmail('cjosrel@gmail.c') == true) {
//     console.log('benar')
// } else{
//     console.log('salah')
// }
// console.log(validator.isMobilePhone('0812345678','id-ID'));

//cara 1
// rl.question('nama anda : ',(nama) =>{
//     rl.question('nomor hp : ', (noHP) => {
//             if(validator.isMobilePhone(noHP) == true){
//                 rl.question('email : ', (email) => {     
//                     if(validator.isEmail(email) == true){
//                         console.log(`nama anda ${nama}`)
//                         console.log(`nomor HP ${noHP}`)
//                         console.log(`email ${email}`)
//                         rl.close()
//                     }else{
//                         console.log('email anda salah')
//                         rl.close()
//                     }
//                 })
//                 }
//             else{
//                 console.log('no hp anda salah')
//                 rl.close()
//             }
//     })
// })

//cara looping

var name = '';
var telpon = '';
var alamatemail = '';
const pertanyaanNama = () => {
    return new Promise (function(resolve, rejects) {
        rl.question('Nama :', (nama) => {
            name = nama
            resolve(nama)
            
        })
    })
}
const pertanyaanNomorHP = () => {
    return new Promise ((resolve, rejects)=> {
        rl.question('Nomor HP :', (nomor) => {
            if(validator.isMobilePhone(nomor) == false){
                console.log(`${nomor} bukan nomor telepon yang benar, coba lagi`)
                pertanyaanNomorHP()
            }else{
                telpon = nomor;
                pertanyaanEmail()
                resolve()
            }
        })
    })
}

const pertanyaanEmail = () => {
    return new Promise ((resolve, rejects) =>{
        rl.question('Email :', (email) =>{
            if(validator.isEmail(email) == false){
                console.log(`${email} bukan email yang benar, coba lagi.`)
                pertanyaanEmail()
            }else{
                alamatemail = email
                console.log(`nama anda : ${name}, nomor telepon anda : ${telpon}, alamat email anda : ${alamatemail}. terima kasih sudah memasukan data.`)
                resolve();
                rl.close()
            }
        })
    })
}

  

const main = async () => {
    await pertanyaanNama()
    await pertanyaanNomorHP()
    await pertanyaanEmail()
    rl.close()
}
main()