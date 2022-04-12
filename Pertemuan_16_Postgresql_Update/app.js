const express = require('express')
const { del } = require('express/lib/application')
const req = require('express/lib/request')
const res = require('express/lib/response')
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
        res.redirect('/list')
    } catch(err){
        console.error(err.message)
    }
})

app.get("/list", async(req,res) => {
    try{
        const listCont = await pool.query(`SELECT name, mobile, email FROM contacts`)
        console.log(listCont.rows)
        const asd = JSON.parse(JSON.stringify(listCont))
        console.log(asd.rows)
        res.json(listCont.rows)
    } catch(err){
        console.error(err.message)
    }
})

app.get("/list/:name", async(req,res) => {
    try{
        const arr = await pool.query(`SELECT name FROM contacts where name='${req.params.name}'`)
        console.log(arr.rowCount)
        console.log(req.params.name)
        if(arr.rowCount == 0){
            // res.redirect('/list')
            res.send(`nama ${req.params.name} tidak ditemukan`)
        } else {
            const listCont = await pool.query(`SELECT name,mobile,email FROM contacts where name='${req.params.name}'`)
            res.json(listCont.rows)
            console.log(listCont.rows)
        }
    } catch(err){
        console.error(err.message)
    }
})

app.get("/update/:name/:email", async(req,res) => {
    try{
        await pool.query(`UPDATE contacts SET email='${req.params.email}' WHERE name='${req.params.name}'`)
        const listCont = await pool.query(`SELECT name, mobile, email FROM contacts`)
        res.json(listCont.rows)
    } catch(err){
        console.error(err.message)
    }
})

//update 2
app.get("/update2/:name", async (req,res) => {
    try{
        const name = "update2"
        const mobile = "081111111111"
        const email = "update@gmail.com"
        const {rows : before} = await pool.query(`SELECT name,mobile,email FROM contacts where name='${req.params.name}'`)
        const upCont = await pool.query(`UPDATE contacts SET name='${name}', mobile='${mobile}', email='${email}' WHERE name='${req.params.name}'`)
        const {rows : after} = await pool.query(`SELECT name,mobile,email FROM contacts where name='${name}'`)
    
        res.json({before,after})
    } catch(err){
        console.error(err.message)
    }
})

app.get("/delete/:name", async(req,res) => {
    try{
        const arr = await pool.query(`SELECT name FROM contacts where name='${req.params.name}'`)
        console.log(arr.rowCount)
        console.log(req.params.name)
        if(arr.rowCount == 0){
            // res.redirect('/list')
            res.send(`nama ${req.params.name} tidak ditemukan`)
        } else {
            await pool.query(`DELETE FROM contacts WHERE name='${req.params.name}'`)
            res.redirect('/list')
        }
    } catch(err){
        console.error(err.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})