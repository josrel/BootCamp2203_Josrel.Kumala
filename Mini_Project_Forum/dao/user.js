const { promiseImpl } = require("ejs")
const pool = require("../db")

const createUserTable = async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS users(
        user_id serial PRIMARY KEY,
        email VARCHAR ( 255 ) UNIQUE NOT NULL,
        password VARCHAR ( 255 ) NOT NULL
    );`
    try {
        await pool.query(sql)
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}

const insertOneUser = async(email,password) => {
    const text = `
    insert into users(email,password)
    values ($1, $2)
    returning *
    `

    const values = [email,password]

    try {
        const user = (await pool.query(text,values)).rows[0]
        console.log('DAO: insert user berhasil',user)
        return user
    } catch (error) {
        return Promise.reject(error)
    }
}

const findUserByEmail = async(email) => {
    const text = `
    select * from users where email=$1`
    const values = [email]

    try {
        const user = (await pool.query(text,values)).rows[0]
        return user
    } catch (error) {
        return Promise.reject(error)
    }
}

module.exports = {
    createUserTable,
    insertOneUser,
    findUserByEmail
}