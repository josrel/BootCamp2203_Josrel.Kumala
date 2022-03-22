console.log('Hello world !');
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});
rl.question('masukan nama : ', function(nama){
    console.log(`Halo ${nama}`);
    rl.close();
});
