const kontak = require('./kelola')


//cara 1
// rl.question('nama : ',(nama) => {
//     rl.question('nomor : ',(nomor) => {
//         //bikin variable jadi object
//         const kontak = {nama,nomor}

//         //baca dulu isi filenya jsonnya
//         const file = fs.readFileSync('data/contacts.json','utf-8')

//         //buat file jadi format json biar masuk ke file format json
//         const contacts = JSON.parse(file)

//         //masukin objek ke filenya
//         contacts.push(kontak)

//         //ngubah data yang ada di json buat jadi string lagi biar di tampilin diterminal
//         fs.writeFileSync('data/contacts.json',JSON.stringify(contacts))
//         console.log('data masuk')
//         rl.close()
//     })
// })


//cara 2

// //bikin fungsi pertanyaan, parameternya ask yang diambil di main
// const pertanyaan = (ask) => {
//     return new Promise((resolve,rejects) => {
//         rl.question(ask,(input)=>{
//             //resolve itu nge return value dari input
//             resolve(input)
//         })
//     })
// }

// const main = async () => {
//     const nama = await pertanyaan('nama : ')
//     const nomor = await pertanyaan('nomor : ')
//     const email = await pertanyaan('email : ')

//     //bikin variable jadi object
//     const kontak = {nama,nomor,email}

//     console.log(nama,nomor,email)

//     //baca dulu isi filenya jsonnya
//     const file = fs.readFileSync('data/contacts.json','utf-8')
    
//     //buat file jadi format json biar masuk ke file format json
//     const contacts = JSON.parse(file)
    
//     //masukin objek ke filenya
//     contacts.push(kontak)
    
//     //ngubah data yang ada di json buat jadi string lagi biar di tampilin diterminal
//     fs.writeFileSync('data/contacts.json',JSON.stringify(contacts))
//     console.log('data masuk')
//     console.log(file)
//     rl.close()
// }

// main()

//cara 3 pisah module

const main = async () => {
    const nama = await kontak.pertanyaan('nama : ')
    const email = await kontak.pertanyaan('email : ')
    const nomor = await kontak.pertanyaan('nomor : ')

    kontak.savecontact(nama,email,nomor)
}

main()


