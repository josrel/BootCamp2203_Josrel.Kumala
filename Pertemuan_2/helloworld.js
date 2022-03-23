console.log('Hello world !');
const { rejects } = require('assert');
const { resolve } = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});
// rl.question('masukan nama : ', function(nama){
//     rl.question('masukan no HP : ', function(noHP){
//         rl.question('masukan email : ', function(email){
//             console.log(`Halo ${nama}, no HP anda ${noHP}, email anda ${email}`);
//             rl.close();
//         })
//     })
// });

//cara 2

const pertanyaan1 = () => {
    return new Promise ((resolve, rejects)=> {
        rl.question('1 + 1 = ', (jawaban) => {
            if(jawaban != 2){
                console.log('jawaban salah')
                pertanyaan1()
            }else{
                console.log(`jawabannya adalah : ${jawaban}`)
                resolve();
            }
        } )
    })
}
const pertanyaan2 = () => {
    return new Promise ((resolve, rejects)=> {
        rl.question('2 + 2 = ', (jawaban) => {
            console.log(`jawabannya adalah : ${jawaban}`)
            resolve();
        } )
    })
}
const pertanyaan3 = () => {
    return new Promise ((resolve, rejects)=> {
        rl.question('3 + 3 = ', (jawaban) => {
            console.log(`jawabannya adalah : ${jawaban}`)
            resolve();
        } )
    })
}
const main = async () => {
    await pertanyaan1()
    await pertanyaan2()
    rl.close()
}
main()