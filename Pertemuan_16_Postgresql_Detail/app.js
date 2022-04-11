const express = require('express')
const { del } = require('express/lib/application')
const app = express()
const pool = require("./db")

app.use(express.json())
const port = 3000

app.get("/addasync", async(req,res) => {
    try{
        const name = "cobacoba"
        const mobile = "08122222333"
        const email = "cobacoba@gmail.com"
        const newCont = await pool.query(`INSERT INTO contacts values ('${name}','${mobile}','${email}') RETURNING *`)
        res.json(newCont.rows)
    } catch(err){
        console.error(err.message)
    }
})

app.get("/list", async(req,res) => {
    try{
        const listCont = await pool.query(`SELECT name, mobile, email FROM contacts`)
        res.json(listCont.rows)
    } catch(err){
        console.error(err.message)
    }
})

app.get("/list/:name", async(req,res) => {
    try{
        const listCont = await pool.query(`SELECT * FROM contacts where name='${req.params.name}'`)
        res.json(listCont.rows)
    } catch(err){
        console.error(err.message)
    }
})

app.get("/updatecontact", async(req,res) => {
    try{
        await pool.query(`UPDATE contacts SET email='cobagan@gmail.com' WHERE name='chandra'`)
        const listCont = await pool.query(`SELECT name, mobile, email FROM contacts`)
        res.json(listCont.rows)
    } catch(err){
        console.error(err.message)
    }
})

app.get("/delete/:name", async(req,res) => {
    try{
        await pool.query(`DELETE FROM contacts WHERE name='${req.params.name}'`)
        const listCont = await pool.query(`SELECT name, mobile, email FROM contacts`)
        res.json(listCont.rows)
    } catch(err){
        console.error(err.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})