const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
const readline = require('readline')
const validator = require('validator')


//udah ga ke pake kalo pake yargs
// const rl = readline.createInterface({
//     input: process.stdin,
//     output : process.stdout,
// })

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



//ini juga ga kepake soalnya pake yargs
//bikin fungsi pertanyaan, parameternya ask yang diambil di main
// const pertanyaan = (ask) => {
//     return new Promise((resolve,rejects) => {
//         rl.question(ask,(input)=>{
//             //resolve itu nge return value dari input
//             resolve(input)
//         })
//     })
// }

//file sama kontak di pindahin ke fungsi baru supaya gampang di panggil di fungsi mana aja
const semuaContact = () => {
    //baca dulu isi filenya jsonnya
    const file = fs.readFileSync('data/contacts.json','utf-8')
    //buat file jadi format json biar masuk ke file format json
    const contacts = JSON.parse(file)
    return contacts
}


const savecontact = (nama,nomor,email) => {
    //bikin variable jadi object
    const kontak = {nama,nomor,email}
    //contohnya ini manggil fungsi semua kontak
    const contacts = semuaContact()
    //variable ini di buat buat kalo nama ada yang sama dicari satu persatu pake find
    //abis itu di cocokin sama nama yang diambil dari input
    //kalo ada bakal keluar tulisan nama udah terdaftar
    //lalu return false supaya programnya berenti
    const duplikat = contacts.find((kontak) => kontak.nama === nama)
    if(duplikat){
        console.log(`${nama} sudah terdaftar`)
        return false
    }   
    //sama kaya duplikat trus validator kaya biasa
    //jangan lupa return false nanti yang ga berhasil juga ikut ke print
    //jangan lupa pake id-ID.. 
    if(!validator.isMobilePhone(nomor,'id-ID')){
        console.log(`${nomor} <= nomor tersebut tidak valid`)
        return false
    }

    //cek email dulu kalo dia ga isi brati jadi false trus lewat aja, nah kalo true baru masuk kondisi
    if(email){
        //sama kaya atas
        if(!validator.isEmail(email)){
            console.log(`${email} <= email tersebut tidak valid`)
            return false
        }
    }
    
    //masukin objek ke filenya
    contacts.push(kontak)
    
    //ngubah data yang ada di json buat jadi string lagi biar di tampilin diterminal
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts))
    console.log('data masuk')
    //ini juga gan
    // rl.close()

}
//fungsi list kontak buat nampilin semua data yang ada di file jsonnya
//fungsi for each buat ngeprint terus sampe hasil di jsonnya habis

const listKontak = () =>{
        
        const contacts = semuaContact()

        contacts.forEach((tampung, i) => {
            console.log(`${i + 1}. ${tampung.nama} - ${tampung.nomor}`)
        })
}

const detailKontak = (nama) => {
    //nah kan di pake lagi
    const contacts = semuaContact()

    //nah pake find buat nyari tuh namanya siape di json
    const kontak = contacts.find(
        //ini si variablenya buat nyocokin nama yang ada di json sama yang orang cari di terminal.
        (kontak) => kontak.nama=== nama
        )

        //nah kalo udah di kasih if nih kalo ga ada brati ya ga ada dong
    if(!kontak){
        console.log(`${nama} tidak di temukan`)
        return false
    }
    //kalo ada ya tunjukin.. semuanya nama nomor..
    console.log(kontak.nama)
    console.log(kontak.nomor)
    //nah kalo email kan bebas yak dia mau masukin ato engga makanya pake if
    if(kontak.email){
        console.log(kontak.email)
    }
}
//fungsi delete kontak
const deleteKontak = (nama) => {
    //panggil funsi list buat jsonnya
    const contacts = semuaContact()
    //bikin var baru buat nampung isi array yang baru
    //pake fungsi filter buat nyaring kontak yang mau di hapus
    //bandingin nama yang di input sama nama yang di json
    const listBaru = contacts.filter((kontak) => kontak.nama !== nama)

    //cara bedain nama yang ada sama yang ga ada
    //bandingin panjang array lama (contact) sama panjang arrray baru (listbaru)
    //kalo misalnya panjangnya sama brati namanya ga ketemu trus di return false
    if(contacts.length === listBaru.length){
        console.log(`${nama} tidak ditemukan`)
        return false
    }
    

    //abis itu masukin file array baru ke jsonnya lagi
    fs.writeFileSync('data/contacts.json',JSON.stringify(listBaru))
    console.log(`data ${nama} berhasil dihapus !`)


}

module.exports = {
    //fungsinya matiin juga
    // pertanyaan,
    savecontact,
    listKontak,
    detailKontak,
    deleteKontak,
}