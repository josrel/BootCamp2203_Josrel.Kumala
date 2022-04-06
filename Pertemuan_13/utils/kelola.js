const fs = require('fs')

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
    fs.writeFileSync('data/contacts.json', JSON.stringify(kontaks))
}

//file sama kontak di pindahin ke fungsi baru supaya gampang di panggil di fungsi mana aja
const semuaContact = () => {
    //baca dulu isi filenya jsonnya
    const file = fs.readFileSync('data/contacts.json','utf-8')
    //buat file jadi format json biar masuk ke file format json
    const contacts = JSON.parse(file)
    return contacts
}

const detailkontak = (nama) => {
    const contacts = semuaContact()
    const kontak = contacts.find((kontak) => kontak.nama=== nama)
    return kontak
}

const tambahkontak = (kontak) => {
    const kontaks = semuaContact()
    kontaks.push(kontak)
    simpankontak(kontaks)
}

module.exports = {
    semuaContact,
    detailkontak,
    tambahkontak
}