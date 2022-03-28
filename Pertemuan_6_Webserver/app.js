const http = require('http')
const fs = require('fs')

const port = 3000

const halamanHTML = (page, res) => {
    fs.readFile(page,(err,data) => {
        if(err){
            res.writeHead(404)
            res.write('error page not found')
        } else{
            res.write(data)
        }
        res.end()
    })
} 

http
    .createServer((req,res) => {
        res.writeHead(200,{
            'ContentType' : 'text/html'
        })
        const url = req.url
        console.log(url)
        if(url==='/about'){
            halamanHTML('about.html',res)
        }else if(url==='/contact'){
            halamanHTML('contact.html',res)
        }else{
            // res.write('Hello World !')
            // fs.readFile('./index.html',(err,data) => {
            //     if(err){
            //         res.writeHead(404)
            //         res.write('Error : page not found')
            //     } else{
            //         res.write(data)
            //     }
            //     res.end()
            // })

            halamanHTML('index.html',res)
        }
}).listen(port,()=>{
    console.log(`Server is listening on port : ${port}..`)
})