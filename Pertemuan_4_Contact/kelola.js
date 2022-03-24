const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output : process.stdout,
})

//mengecek folder sudah ada ato belom
const cekdir = './data'
if(!fs.existsSync(cekdir)){
    fs.mkdirSync(cekdir)
}

//mengecek file udah ada ato belom
const cekfile = './data/contacts.json'
if(!fs.existsSync(cekfile)){
    fs.writeFileSync(cekfile,'[]','utf-8')
}

//bikin fungsi pertanyaan, parameternya ask yang diambil di main
const pertanyaan = (ask) => {
    return new Promise((resolve,rejects) => {
        rl.question(ask,(input)=>{
            //resolve itu nge return value dari input
            resolve(input)
        })
    })
}

const savecontact = (nama,nomor,email) => {
    //bikin variable jadi object
    const kontak = {nama,nomor,email}

    console.log(nama,nomor,email)

    //baca dulu isi filenya jsonnya
    const file = fs.readFileSync('data/contacts.json','utf-8')
    
    //buat file jadi format json biar masuk ke file format json
    const contacts = JSON.parse(file)
    
    //masukin objek ke filenya
    contacts.push(kontak)
    
    //ngubah data yang ada di json buat jadi string lagi biar di tampilin diterminal
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts))
    console.log('data masuk')
    console.log(file)
    rl.close()

}

module.exports = {
    pertanyaan,
    savecontact,
}