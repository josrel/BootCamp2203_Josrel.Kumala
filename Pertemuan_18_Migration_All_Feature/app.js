const express = require('express')
const fs = require('fs')
const app = express()
const expressLayout = require('express-ejs-layouts')
const {semuaContact, detailkontak, tambahkontak, cekdobel, hapuskontak, updatekontak,selectFrom} = require('./utils/kelola')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const { ensureAuthenticated } = require('connect-ensure-authenticated')
const port = 3000
const pool = require("./db")
const { json } = require('express')
const {listcontact} = require('./model')

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

app.get('/',(req,res) =>{
        res.render('index' ,{
            nama:'josrel chandra',
            title:'Home Page',
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

app.get('/register',(req,res) =>{    
    res.render('login',{
        title:'register page',
        layout: 'layout/expresslayout'
    })
})

//LIST CONTACT
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

app.get('/contact/tambahkontak',(req,res) =>{
    res.render('tambahkontak',{
        title:'contact page',
        tulisan: 'halo view engine contact josrel',
        layout: 'layout/expresslayout'
    })
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






//PINDAH KE FORM TAMBAH CONTACT


//TAMBAH KONTAK
app.post("/contact",[
    body('nama').custom(async(value)=>{
        const dobel = await pool.query(`Select nama from kontak where nama='${value}'`)
        console.log(dobel.rowCount)
        if(dobel.rowCount > 0){
            throw new Error(`nama ${value} sudah terdaftar`)
            console.log(1)
        } else{
            return true
        }
        }),
    check('email','email salah').isEmail(),
    check('nomor','nomor salah').isMobilePhone('id-ID'),
], async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.render('updatekontak',{
            title: 'Form update data',
            layout: 'layout/expresslayout',
            errors: errors.array(),
            kontak : req.body
        })
    }else {
    try{
        const {nama, email, nomor } = req.body
        const newCont = await pool.query(`INSERT INTO kontak values ('${nama}','${email}','${nomor}') RETURNING *`)
        console.log(newCont.rows)
        req.flash('msg',`kontak ${nama} berhasil ditambah`)
        res.redirect('/contact')
    } catch(err){
        console.error(err.message)
    }
}
})










//PINDAH KE FORM EDIT CONTACT
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


//UPDATE CONTACT
app.post("/contact/update", [
    body('nama').custom(async(value, {req})=>{
        const dobel = await pool.query(`Select nama from kontak where nama='${value}'`)
        console.log(dobel.rowCount)
        if(value === req.body.namalama){
            return true
        } else if (dobel.rowCount > 0) {
            throw new Error(`nama ${value} sudah terdaftar`)
            // console.log(1)
         } else{
             return true
         }
        }),
    check('email','email salah').isEmail(),
    check('nomor','nomor salah').isMobilePhone('id-ID'),
], async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.render('updatekontak',{
            title: 'Form update data',
            layout: 'layout/expresslayout',
            errors: errors.array(),
            kontak : req.body
        })
    }else {
        try{
            const {nama, email, nomor,namalama } = req.body
            await pool.query(`UPDATE kontak SET nama='${nama}',email='${email}',nomor='${nomor}' WHERE nama='${namalama}'`)
            req.flash('msg',`kontak berhasil diubah`)
            res.redirect('/contact')
        } catch(err){
            console.error(err.message)
        }
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

//DELETE CHECKBOX
app.post('/hapuskontak',async (req, res) => {    

    try {
        const {checked} = req.body
        console.log(checked)
        console.log(checked.length)
        if(Array.isArray(checked)){
            checked.forEach(element => {
                hapuskontak(element)
                req.flash('msg',`${checked.length} data berhasil dihapus`)
            })
        } else{
            hapuskontak(checked)
            req.flash('msg',`${checked} data berhasil dihapus`)
        }
        res.redirect('/contact')
    } catch (error) {
        console.error(error.message)
    }
})

app.use('/',(req,res) =>{
    res.status(404)
    res.send('404 Page not Found')
})
app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 