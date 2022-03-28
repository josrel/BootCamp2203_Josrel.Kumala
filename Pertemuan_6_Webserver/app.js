//panggil requirenya http sama fs
const http = require('http')
const fs = require('fs')

//bikin variable port biar kalo ganti ganti gampang
const port = 3000

//bikin fungsi buat nampung semua readfilenya, masukin parameter page buat ambil urlnya, res buat ambil balikin responnya
const halamanHTML = (page, res) => {
    //kasih read file yang ambil urlnya,kasih parameter buat error sama buat ambil data dari filenya
    fs.readFile(page,(err,data) => {
        //kalo error keluarin 404 sama error page not found
        if(err){
            res.writeHead(404)
            res.write('error page not found')
        //kalo ga eror masuk else lalu tampilin data dari file html nya
        } else{
            res.write(data)
        }
        //jangan lupa kalo udah selesai pake res end
        res.end()
    })
} 
//disini pake module http create server, memang ini caranya haha
http
    .createServer((req,res) => {
        res.writeHead(200,{
            'ContentType' : 'text/html'
        })
        //bikin variable url buat ambil ato get si link yang ada di browsernya
        const url = req.url
        //ini print aja supaya pastiin link yang di get itu sama kaya di web
        console.log(url)

//ini cara pake IF
        // if(url==='/about'){
        //     halamanHTML('about.html',res)
        // if(url==='/contact'){
        //     halamanHTML('contact.html',res)
        // }else{
        //     halamanHTML('index.html',res)
        // }

//ini cara pake SWITCH
//jangan lupa titik 2 setelah case..
        switch(url){
            case('/index'):
            halamanHTML('index.html',res)
            break
            case('/about'):
            halamanHTML('about.html',res)
            break
            case('/contact'):
            halamanHTML('contact.html',res)
            break
        }
//listen port memang bagian cari cara panggil module HTTP, jadi di hafal saja wkwk
//nah port kepake disini ges
}).listen(port,()=>{
    //ini ya itu apa ya pokonya print aja ini buat ngasih tau running di port berapa..
    console.log(`Server is listening on port : ${port}..`)
})