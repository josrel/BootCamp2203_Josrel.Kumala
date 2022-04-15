const userService = require('../service/userService')
const {validationResult} = require('express-validator')
const pool = require("../db")

const HomePage = (req, res) => {
    res.render('home',
    {
        title:'home',
        layout: 'layout/expresslayout',
    })
}

const LoginPage = (req, res) => {
    res.render('signin',
    {
        title:'home',
        layout: 'layout/expresslayout',
    })
}

const SignupPage = (req, res) => {
    res.render('signup',
    {
        title:'home',
        layout: 'layout/expresslayout',
    })
}

const SignupHandler = async(req,res,next) => {
    const {email, password } = req.body
try {
    const error = validationResult(req)
    if(!error.isEmpty()){
        error.status = 400
        throw error
    }
    const user = await userService.signup(email,password)
    console.log(user)
    req.session.user = user
    res.json({
        message: 'signup user sukses',
        data: {
            id: user.user_id
        }
    })
} catch (error) {
    res.status(error.status).json(error)
}
}
//login handler
const LoginHandler = async(req,res,next) => {
    const {email, password } = req.body
try {
    const error = validationResult(req)
    if(!error.isEmpty()){
        error.status = 400
        throw error
    }

    const user = await userService.login(email,password)
    req.session.user = user
    console.log(user)
    res.json({
        message: 'login sukses',
        data: {
            id: user.user_id
        }
    })
    console.log('berhasil masuk')
} catch (error) {
    res.status(error.status).json(error)
}
}


//logout handler
const LogoutHandler = (req,res,next) => {
    req.session.destroy((err) => {
        if(err){
            next(err)
        }
        res.redirect('/')
    })
}

const index = async(req,res) =>{
    try{
        const {rows : main} = await pool.query(`SELECT * FROM kategori_forum order by id_main asc`)
               res.render('index',
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
}

module.exports = {
    HomePage,
    LoginPage,
    SignupPage,
    SignupHandler,
    LoginHandler,
    LogoutHandler,
    index
}