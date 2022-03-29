const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res) =>{
    res.sendFile('index.html',{root: __dirname})
})
app.get('/index',(req,res) =>{
    res.sendFile('index.html',{root: __dirname})
    console.log({root: __dirname})
})
app.get('/about',(req,res) =>{
    res.sendFile('about.html',{root: __dirname})
})
app.get('/contact',(req,res) =>{
    res.sendFile('contact.html',{root: __dirname})
})
app.get('/product/:id',(req,res) =>{
    res.send(`product id : ${req.params.id}`)
})
app.get('/product/:id/category',(req,res) =>{
    res.send(`product id : ${req.params.id}<br>name : ${req.params.category}`)
})
// app.get('/product/:name', (req, res) => {
//     res.send(`product id : ${req.params.id} <br> with name : ${req.query.name}`)
// })

app.get('/sample/:id', function(req, res) {

    var id = req.params.id;
    var id2 = req.query.id; 
   console.log(id)
   console.log(id2)
   res.send(`product id : ${id} <br> category ${id2}`)
   });
app.use('/',(req,res) =>{
    res.status(404)
    res.send('Page not Found')
})


app.listen(port,() => {
    console.log(`listening on port ${port}`)
})