console.log('Hello world !');
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});
rl.question('masukan nama : ', function(nama){
    rl.question('masukan no HP : ', function(noHP){
        rl.question('masukan email : ', function(email){
            console.log(`Halo ${nama}, no HP anda ${noHP}, email anda ${email}`);
            rl.close();
        })
    })
});
