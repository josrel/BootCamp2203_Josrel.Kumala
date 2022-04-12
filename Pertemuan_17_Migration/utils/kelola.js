const fs = require('fs')
const pool = require("../db")
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

const simpankontak = (kontaks) =>{
    fs.writeFileSync('./data/contacts.json', JSON.stringify(kontaks))
}



//file sama kontak di pindahin ke fungsi baru supaya gampang di panggil di fungsi mana aja
// const semuaContact = () => {
//     //baca dulu isi filenya jsonnya
//         const file = fs.readFileSync(pool.query(`SELECT * FROM kontak`),'utf-8')
//     // const file = pool.query(`SELECT * FROM kontak`)
//     // console.log(file)
//     const kontaks = JSON.parse(file)
//     return kontaks
//     // const query = pool.query(`SELECT * FROM kontak`)
//     // const file = fs.readFile(query,'utf-8',(err,jsonString) => {
//     //     if(err){
//     //         console.log(err)
//     //     }else{
//     //         try{
//     //                 const data = JSON.parse(jsonString)
//     //                 return data
//     //         }catch(err){
//     //             console.log('error parsing data',err)
//     //         }
//     //     }
//     // })
//     // console.log(file)
//     // const contacts = JSON.parse(JSON.stringify(file))
//     // return file
//     // const file = fs.readFileSync('data/contacts.json','utf-8')
//     // //buat file jadi format json biar masuk ke file format json
//     // const contacts = JSON.parse(file)
//     // return contacts
// }

const detailkontak = (nama) => {
    const contacts = semuaContact()
    const kontak = contacts.find((kontak) => kontak.nama=== nama)
    return kontak
}

const cekdobel = (nama) =>{
    const kontaks = semuaContact()
    return kontaks.find((kontak) => kontak.nama.toLowerCase() === nama.toLowerCase())
}

const tambahkontak = (kontak) => {
    const kontaks = semuaContact()
    kontaks.push(kontak)
    simpankontak(kontaks)
}

const hapuskontak = (nama) => {
    const kontaks = semuaContact()
    const filterkontak = kontaks.filter((kontak) => kontak.nama !== nama)
    simpankontak(filterkontak)
}

const updatekontak = (kontakbaru) => {
    const kontaks = semuaContact()
    const filterkontak = kontaks.filter((kontak) => kontak.nama !== kontakbaru.namalama)
    delete kontakbaru.namalama
    filterkontak.push(kontakbaru)
    simpankontak(filterkontak)
}

module.exports = {
    // semuaContact,
    detailkontak,
    tambahkontak,
    cekdobel,
    hapuskontak,
    updatekontak
}