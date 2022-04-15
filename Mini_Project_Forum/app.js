require('dotenv').config()
const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts')
const { cekdobel, hapustopik ,selectFrom} = require('./utils/kelola')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const { ensureAuthenticated } = require('connect-ensure-authenticated')
const port = 3000
const pool = require("./db")
const { json } = require('express')
const {listcontact} = require('./model')
const { MemoryStore } = require('express-session')
const userDAO = require('./dao/user')
const controller = require('./controller/routeHandler')
const checkAuth = require('./middleware/auth')
const identifyUser = require('./middleware/identify')
const redis = require('redis')
const multer = require('multer')

const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'images')
    },
    filename: (req, file, cb) => {
        cb(null,new Date().toString() + '-' + file.originalname)
    }
})
const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ||  file.mimetype === 'image/jpeg'){
        cb(null, true)
    } else{
        cb(null, false)
    }
}
 app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

const morgan = require('morgan')
const userService = require('./service/userService')
const dataValidator = require('./middleware/dataValidator')
const logger = require('./config/logger')
const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient({
    host: 'localhost',
    port: 66379
})

const sessionStorage = new MemoryStore()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.json())
app.use(expressLayout)
app.use(express.urlencoded({extended:true}))
app.use(cookieParser('secret'))
app.use(session({
    name: 'session',
    secret: process.env.SESSION_SECRET,
    store: sessionStorage,
    resave: false,
    saveUninitialized:false,
    rolling: true,
    cookie: {
        secure: false,
        httpOnly:true,
        maxAge:1000 * 60
    },
}))
app.use(flash())

app.use(express.static('asset'))
require('./routes/image_routes');(app);


var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan(':date :remote-user :method :url' ,{ stream: accessLogStream }))


app.use('*',identifyUser)

//LOGIN SESSION
app.get('/', controller.HomePage)
app.get('/login', controller.LoginPage)
app.get('/signup', controller.SignupPage)
app.post('/signup',dataValidator.signup, controller.SignupHandler)
app.post('/login',dataValidator.login, controller.LoginHandler)
app.get('/logout',controller.LogoutHandler)
app.get('/index', checkAuth ,controller.index )

//MAIN FORUM SESSION

//kategori main forum
app.get('/kategorisetting',checkAuth ,async(req,res) =>{
    try{
        const {rows : main} = await pool.query(`SELECT * FROM kategori_forum order by id_main asc`)
               res.render('kategorisetting',
               {
                   title:'contact page',
                   tulisan: 'halo view engine contact josrel',
                   layout: 'layout/expresslayout',
                   main,
                   msg: req.flash('msg')
               })
            }catch(err){
            console.error(err.message)
    }
})
//DELETE CHECKBOX
app.post('/hapustopik',checkAuth,async (req, res) => {    
    try {
        const {checked} = req.body
        console.log(checked)
        console.log(checked.length)
        if(Array.isArray(checked)){
            checked.forEach(element => {
                hapustopik(element)
            })
            req.flash('msg',`${checked.length} data berhasil dihapus`)
        } else{
            hapustopik(checked)
            req.flash('msg',`${checked} data berhasil dihapus`)
        }
        res.redirect('/kategorisetting')
    } catch (error) {
        console.error(error.message)
    }
})

//masuk ke form tambah topik
app.get('/tambahmain', checkAuth,async(req,res) =>{
    try{
        const {rows : main} = await pool.query(`SELECT * FROM kategori_forum`)
               res.render('tambahmain',
               {
                   title:'Main page',
                   tulisan: 'halo view engine contact josrel',
                   layout: 'layout/expresslayout',
                   main,
                   msg: req.flash('msg')
               })
            }catch(err){
            console.error(err.message)
    }
})

//create main forum
app.post("/main_discussion",checkAuth ,async(req,res) => {
    try{
        const {nama, deskripsi} = req.body
        console.log(req.body)
        const newCont = await pool.query(`INSERT INTO kategori_forum(nama_kategori, detail_kategori) values ('${nama}','${deskripsi}') RETURNING *`)
        // req.flash('msg',`merk ${nama} berhasil ditambah`)
        res.redirect('/index')
    } catch(err){
        console.error(err.message)
    }
})

//form edit main forum
app.get('/edit/:nama',checkAuth, async(req,res) =>{
    try{
        const {rows : listCont} = await pool.query(`SELECT * FROM kategori_forum WHERE nama_kategori='${req.params.nama}'`)
       listCont.map(
            kategori =>
               res.render('editkategori',
               {
                   title:'contact page',
                   tulisan: 'halo view engine contact josrel',
                   layout: 'layout/expresslayout',
                   kategori
               })
               )
            }catch(err){
            console.error(err.message)
    }
})

app.post("/main_discussion/update",checkAuth, async(req,res) => {
    try{
        const {nama, deskripsi,id} = req.body
        await pool.query(`UPDATE kategori_forum SET nama_kategori='${nama}',detail_kategori='${deskripsi}' WHERE id_main='${id}'`)
        req.flash('msg',`deskripsi topik berhasil diubah`)
        res.redirect('/kategorisetting')
    } catch(err){
        console.error(err.message)
    }
})


//SUBMAIN
app.get('/submain/:merk',checkAuth ,async(req,res) =>{
    try{
        const {rows : submain} = await pool.query(`
        SELECT *
        FROM thread_forum 
        WHERE thread_forum.merk ='${req.params.merk}'
        `)
               res.render('submain',
               {
                   title:'Sub Forum page',
                   tulisan: 'halo view engine contact josrel',
                   layout: 'layout/expresslayout',
                   submain
               })
            }catch(err){
            console.error(err.message)
    }
})

app.get('/tambahsubmain',checkAuth ,async(req,res) =>{
    try{
        const {rows : submain} = await pool.query(`SELECT * FROM kategori_forum`)
        console.log(req.session.user.email)
               res.render('tambahsubmain',
               {
                   title:'Tambah Thread page',
                   tulisan: 'halo view engine contact josrel',
                   layout: 'layout/expresslayout',
                   submain,
                   msg: req.flash('msg')
               })
            }catch(err){
            console.error(err.message)
    }
})

app.post("/submain_discussion", checkAuth,async(req,res) => {
    try{
        const {nama, deskripsi, selectpicker,filetoupload} = req.body
        const newCont = await pool.query(`INSERT INTO thread_forum(judul_thread, deskripsi_thread, time, merk,creator) values ('${nama}','${deskripsi}','${Date().replace(' GMT+0700 (Western Indonesia Time)', '')}','${selectpicker}','${req.session.user.email}') RETURNING *`)
        // req.flash('msg',`merk ${nama} berhasil ditambah`)
        res.redirect('/index')
    } catch(err){
        console.error(err.message)
    }
})



// //Disscussion Page

app.get('/discussion/:nama',checkAuth ,async(req,res) =>{
    try{
        console.log(req.params.nama)
        const discuss = await pool.query(`
        SELECT thread_forum.judul_thread, thread_forum.creator, thread_forum.time, thread_forum.deskripsi_thread, discussion.email, discussion.comment_discussion,discussion.jam_comment
        FROM thread_forum 
        join discussion on thread_forum.judul_thread=discussion.nama_thread
        WHERE thread_forum.judul_thread='${req.params.nama}'`)
        console.log(discuss.rowCount)
               res.render('discussion',
               {
                   title:'contact page',
                   tulisan: 'halo view engine contact josrel',
                   layout: 'layout/expresslayout',
                   discuss : discuss.rows
               })
            }catch(err){
            console.error(err.message)
    }
})

app.post("/thread_comment/:nama",checkAuth, async(req,res) => {
    try{
        const {comments} = req.body.comments
        console.log(req.body.comments)
        console.log(req.session.user.email)
        console.log(req.params.nama)

        
        const newCont = await pool.query(`INSERT INTO discussion(email, comment_discussion, nama_thread,jam_comment) 
        values ('${req.session.user.email}','${req.body.comments}','${req.params.nama}','${Date().replace(' GMT+0700 (Western Indonesia Time)', '')}') RETURNING *`)
        res.redirect('/index')
    } catch(err){
        console.error(err.message)
    }
})




//UPDATE CONTACT




app.use('/',(req,res) =>{
    res.status(404)
    res.send('404 Page not Found')
})
app.listen(port,async() => {
    try {
        await userDAO.createUserTable()
        logger.log('info',`listen to port ${port}`)
    } catch (error) {
        console.error(error)
    }
}) 