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


const savecontact = (nama,nomor,email) => {
    //bikin variable jadi object
    const kontak = {nama,nomor,email}


    //baca dulu isi filenya jsonnya
    const file = fs.readFileSync('data/contacts.json','utf-8')
    //buat file jadi format json biar masuk ke file format json
    const contacts = JSON.parse(file)

    const duplikat = contacts.find((kontak) => kontak.nama === nama)
    if(duplikat){
        console.log(`${nama} sudah terdaftar`)
        return false
    }   
    //sama kaya duplikat trus validator kaya biasa
    //jangan lupa return false nanti yang ga berhasil juga ikut ke print
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
    console.log(file)
    //ini juga gan
    // rl.close()

}

module.exports = {
    //fungsinya matiin juga
    // pertanyaan,
    savecontact,
}