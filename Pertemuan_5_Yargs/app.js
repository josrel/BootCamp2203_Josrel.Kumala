// const kontak = require('./kelola')

// const main = async () => {
//     const nama = await kontak.pertanyaan('nama : ')
//     const email = await kontak.pertanyaan('email : ')
//     const nomor = await kontak.pertanyaan('nomor : ')

//     kontak.savecontact(nama,email,nomor)
// }

// main()

const yargs = require('yargs')
const kontak = require('./kelola')


yargs.command({
    command: 'add',
    describe: 'memasukan data ',
    builder:{
        nama:{
            describe: 'nama kontak',
            demandOption: true,
            type: 'string',
        },
        email:{
            describe: 'kontak email',
            demandOption:false,
            type:'string'
        },
        nomor:{
            describe:'kontak nomor',
            demandOption:true,
            type:'string',
        },
    },
    handler(argv){
        kontak.savecontact(argv.nama,argv.nomor,argv.email)
    },
}).demandCommand()

yargs.parse()