const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const {semuaContact, detailkontak, tambahkontak} = require('./utils/kelola')
const port = 3001

app.set('view engine', 'ejs')
app.use(expressLayout)
app.use(express.urlencoded())

app.use(express.static('asset'))

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
    const kontaks = semuaContact()
    res.render('contact',{
        title:'contact page',
        tulisan: 'halo view engine contact josrel',
        layout: 'layout/expresslayout',
        kontaks
    })
})
app.get('/contact/tambahkontak',(req,res) =>{
    res.render('tambahkontak',{
        title:'contact page',
        tulisan: 'halo view engine contact josrel',
        layout: 'layout/expresslayout'
    })
})
app.post('/contact', (req, res) => {
    console.log(req.body)
    tambahkontak(req.body)
    res.redirect('/contact')
})
app.get('/contact/:nama',(req,res) =>{
    const detail = detailkontak(req.params.nama)
    res.render('detail',{
        title:'contact page',
        tulisan: 'halo view engine contact josrel',
        layout: 'layout/expresslayout',
        detail
    })
})
app.use('/',(req,res) =>{
    res.status(404)
    res.send('404 Page not Found')
})
app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 