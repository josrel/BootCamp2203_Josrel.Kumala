const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const {semuaContact, detailkontak, tambahkontak, cekdobel, hapuskontak, updatekontak} = require('./utils/kelola')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const { ensureAuthenticated } = require('connect-ensure-authenticated')
const port = 3000

app.set('view engine', 'ejs')
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
        kontaks,
        msg: req.flash('msg')
    })
})
app.get('/contact/tambahkontak',(req,res) =>{
    res.render('tambahkontak',{
        title:'contact page',
        tulisan: 'halo view engine contact josrel',
        layout: 'layout/expresslayout'
    })
})
app.post('/contact',[
    body('nama').custom((value)=>{
        const dobel = cekdobel(value)
        if(dobel){
            throw new Error('nama sudah terdaftar')
        }
        return true
    }),
    check('email','email salah').isEmail(),
    check('nomor','nomor salah').isMobilePhone('id-ID'),
]
,(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.render('tambahkontak',{
            title: 'Form tambah data',
            layout: 'layout/expresslayout',
            errors: errors.array()
        })
    }else{
    tambahkontak(req.body)
    req.flash('msg','data berhasil ditambah')
    res.redirect('/contact')
    }
})

app.get('/contact/delete/:nama', (req,res) => {
    const deletekontak = detailkontak(req.params.nama)
    if(!deletekontak){
        res.status(404)
        res.send(`nama ${req.params.nama} tidak ditemukan`)
    }else{
        hapuskontak(req.params.nama)
        req.flash('msg',`nama ${req.params.nama} berhasil dihapus`)
        res.redirect('/contact')
    }
})

app.post('/hapuskontak',(req, res) => {    
    const {checked} = req.body
    console.log(checked)
    console.log(checked.length)
    if(Array.isArray(checked)){
        console.log('1')
        checked.forEach(kontak => {
            hapuskontak(kontak)
            req.flash('msg',`${checked.length} data berhasil dihapus`)
            res.redirect('/contact')
        })
    } else {
        hapuskontak(checked)
        console.log('2')
        req.flash('msg',`${checked} data berhasil dihapus`)
        res.redirect('/contact')
    }
})

app.get('/contact/editkontak/:nama', (req, res) => {
    const kontak = detailkontak(req.params.nama)
    res.render('updatekontak',{
        title: 'Form update data',
        layout: 'layout/expresslayout',
        kontak
    })
})

app.post('/contact/update',[
    body('nama').custom((value, {req})=>{
        const dobel = cekdobel(value)
        if(value !== req.body.namalama && dobel){
            throw new Error('nama sudah terdaftar')
        }
        return true
    }),
    check('email','email salah').isEmail(),
    check('nomor','nomor salah').isMobilePhone('id-ID'),
] ,(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.render('updatekontak',{
            title: 'Form update data',
            layout: 'layout/expresslayout',
            errors: errors.array(),
            kontak : req.body
        })
    }else{
    updatekontak(req.body)
    req.flash('msg','data berhasil diupdate')
    res.redirect('/contact')
    }
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