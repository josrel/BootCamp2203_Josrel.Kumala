const express = require('express')
const fs = require('fs')
const app = express()
const expressLayout = require('express-ejs-layouts')
const {semuaContact, detailkontak, tambahkontak, cekdobel, hapuskontak, updatekontak} = require('./utils/kelola')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const { ensureAuthenticated } = require('connect-ensure-authenticated')
const port = 3000
const pool = require("./db")
const { json } = require('express')
const db = require('./db')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(expressLayout)
app.use(express.urlencoded({extended:true}))
app.use(cookieParser('secret'))
app.use(session({
    cookie: {maxAge:6000},
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}))
app.use(flash())

app.use(express.static('asset'))

app.get('/', async(req,res) =>{
    const kontaks = await semuaContact()
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
app.post('/hapuskontak',(req, res) => {    
    const {checked} = req.body
    console.log(checked)
    console.log(checked.length)
    if(Array.isArray(checked)){
        console.log('1')
        checked.forEach(kontak => {
            hapuskontak(kontak)
        })
        req.flash('msg',`${checked.length} data berhasil dihapus`)
    } else {
        hapuskontak(checked)
        console.log('2')
        req.flash('msg',`${checked} data berhasil dihapus`)
    }
    res.redirect('/contact')
})

app.get('/contact/tambahkontak',(req,res) =>{
    res.render('tambahkontak',{
        title:'contact page',
        tulisan: 'halo view engine contact josrel',
        layout: 'layout/expresslayout'
    })
})


//MIGRATION

//list contact
app.get('/contact', async(req,res) =>{
    try{
        const {rows : kontaks} = await pool.query(`SELECT * FROM kontak`)
               res.render('contact',
               {
                   title:'contact page',
                   tulisan: 'halo view engine contact josrel',
                   layout: 'layout/expresslayout',
                   kontaks,
                   msg: req.flash('msg')
               })
            }catch(err){
            console.error(err.message)
    }
})

//DETAIL CONTACT
app.get('/contact/:nama', async(req,res) =>{
    try{
        const {rows : listCont} = await pool.query(`SELECT * FROM kontak WHERE nama='${req.params.nama}'`)
       listCont.map(
            detail =>
               res.render('detail',
               {
                   title:'contact page',
                   tulisan: 'halo view engine contact josrel',
                   layout: 'layout/expresslayout',
                   detail
               })
               )
            }catch(err){
            console.error(err.message)
    }
})

app.get('/contact/editkontak/:nama', async(req,res) =>{
    try{
        const {rows : listCont} = await pool.query(`SELECT * FROM kontak WHERE nama='${req.params.nama}'`)
       listCont.map(
            kontak =>
               res.render('updatekontak',
               {
                   title:'contact page',
                   tulisan: 'halo view engine contact josrel',
                   layout: 'layout/expresslayout',
                   kontak
               })
               )
            }catch(err){
            console.error(err.message)
    }
})

app.post("/contact/update", async(req,res) => {
    try{
        const {nama, email, nomor,namalama } = req.body
        console.log(req.body)
        await pool.query(`UPDATE kontak SET nama='${nama}',email='${email}',nomor='${nomor}' WHERE nama='${namalama}'`)
        res.redirect('/contact')
    } catch(err){
        console.error(err.message)
    }
})

//DELETE CONTACT
app.get('/contact/delete/:nama', async(req,res) => {
    try{
        await pool.query(`DELETE FROM kontak WHERE nama='${req.params.nama}'`)
        res.redirect('/contact')
    }catch(err){
            console.error(err.message)
    }
})


//TAMBAH KONTAK

app.post("/contact", async(req,res) => {
    try{
        const {nama, email, nomor } = req.body
        const newCont = await pool.query(`INSERT INTO kontak values ('${nama}','${email}','${nomor}') RETURNING *`)
        console.log(newCont.rows)
        res.redirect('/contact')
    } catch(err){
        console.error(err.message)
    }
})


app.use('/',(req,res) =>{
    res.status(404)
    res.send('404 Page not Found')
})
app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 