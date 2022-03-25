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

yargs.command({
    command: 'list',
        describe: 'menampilkan semua nama dan no hp',
        handler(){
            kontak.listKontak()
        }
})

yargs.command({
    command: 'detail',
        describe: 'menampilkan detail dari nama',
        builder: {
            nama:{
                describe:'masukan nama',
                demandOption:true,
                type:'string',
            }
        },
        handler(argv){
            kontak.detailKontak(argv.nama)
        }
})

yargs.command({
    command: 'delete',
        describe: 'menghapus list nama',
        builder: {
            nama:{
                describe:'masukan nama',
                demandOption:true,
                type:'string',
            }
        },
        handler(argv){
            kontak.deleteKontak(argv.nama)
        }
})

yargs.parse()