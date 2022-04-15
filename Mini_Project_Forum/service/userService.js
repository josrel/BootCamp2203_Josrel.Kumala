const userDAO = require('../dao/user')
const bcrypt = require('bcrypt')

const signup = async(email, password) => {
    //validasi email

    try {
        //hash password
        const saltRound = 10
        const hash = await bcrypt.hash(password,saltRound)
        
        //insert ke db
        const user = await userDAO.insertOneUser(email,hash)
        return user
    } catch (error) {
        return Promise.reject(new Error("signup gagal"))
    }
}

const login = async(email,password) => {
    //validasi email di middlewawre

    try {
        //find user
        const user = await userDAO.findUserByEmail(email)
        console.log(user)
        const match = await bcrypt.compare(password, user.password)
        if(match){
            return user
        }
        const error = new Error()
        error.status = 400
        error.errors = [
            {
                param: 'password',
                msg: 'email atau password salah'
            }
        ]
        throw error
    } catch (error) {
        return Promise.reject(error)
        
    }
}

module.exports = {
    signup,
    login
}