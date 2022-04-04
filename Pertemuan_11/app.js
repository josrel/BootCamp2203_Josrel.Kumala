const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const {semuaContact} = require('./utils/kelola')
const morgan = require('morgan')
const port = 3000

app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(expressLayout)
//apa bila membuka halaman about
//GET / 304 11.964 - -
//GET  adalah method mengeluarkan log pada saat masuk kedalam page 
// 304  adalah status dari halaman tersebut dan 304 memberi informasi bahwa halaman tersebut adalah halaman static atau not modified
// 11.964 adalah response time yang memberi informasi waktu untuk nge-load filenya 
// -- adalah contect lenght yang memberi tahu berapa banyak karakter yang ada di halaman tersebut

//GET /asdasd 404 5.198 ms - 18
//perbedaan dengan penjelasan diatas,
// halaman error 404 memberitahukan halaman tersebut tidak ditemukan atau error
//response time sama dengan di atas
// - 18 merupakan banyak karakter yang ditampilkan di halaman
//kalimat yang ada di halaman error adalah "404 Page not Found"

app.use(express.static('asset'))

app.use((res,req,next) => {
console.log('Time : ', Date.now())
next()
})

app.get('/',(req,res) =>{
    const kontaks = semuaContact()
    res.render('index' ,{
        nama:'josrel chandra',
        title:'Home Page',
        layout: 'layout/expresslayout',
        kontaks
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
    res.send('404 Page not Found')
})
app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 