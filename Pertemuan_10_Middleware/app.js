const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const morgan = require('morgan')
const port = 3000

app.set('view engine', 'ejs')
app.use(expressLayout)
app.use(morgan('dev'))
//GET / 304 11.964 - -
//GET = mengeluarkan log pada saat masuk kedalam page 
// 304 = memberi informasi bahwa halaman tersebut adalah halaman static
// 11.964 = memberi informasi waktu untuk nge-load filenya 


app.use(express.static('asset'))

app.use((res,req,next) => {
console.log('Time : ', Date.now())
next()
})

app.get('/',(req,res) =>{
    cont =[
        {
            nama : '1',
            email : '1@gmail.com'
        },
        {
            nama : '2',
            email : '2@gmail.com'
        },
        {
            nama : '3',
            email : '3@gmail.com'
        },
        {
            nama : '4',
            email : '4@gmail.com'
        },
    ]
    res.render('index' ,{
        nama:'josrel chandra',
        title:'Home Page',
        cont,
        layout: 'layout/expresslayout'
    })
})
app.get('/about',(req,res) =>{    
    res.render('about',{
        title:'about page',
        name:'Josrel Chandra',
        tulisan: 'Maranatha Christian University',
        layout: 'layout/expresslayout',
    })
})
app.get('/contact',(req,res) =>{
    res.render('contact',{
        title:'contact page',
        tulisan: 'halo view engine contact josrel',
        layout: 'layout/expresslayout'
    })
})
app.use('/',(req,res) =>{
    res.status(404)
    res.send('Page not Found')
})
app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 