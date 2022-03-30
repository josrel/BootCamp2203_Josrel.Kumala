const express = require('express')
const app = express()
const port = 3001

app.set('view engine', 'ejs')

app.get('/',(req,res) =>{
    res.render('index',{
        title:'home page',
        nama : "asdasd",
    })
})
app.get('/index',(req,res) =>{
    res.render('index',{
        title: 'index page',
        nama : "dsadsa",
    })
})
app.get('/about',(req,res) =>{    
    res.render('about',{
        nama: 'josrel'
    })
})
app.get('/contact',(req,res) =>{
    res.render('contact')
})
// app.get('/product/:id',(req,res) =>{
//     res.send(`product id : ${req.params.id}`)
// })
// app.get('/product/:id/category',(req,res) =>{
//     res.send(`product id : ${req.params.id}<br>name : ${req.params.category}`)
// })
// app.get('/product/:name', (req, res) => {
//     res.send(`product id : ${req.params.id} <br> with name : ${req.query.name}`)
// })

app.get('/product/:id', function(req, res) {
   res.send(`product id : ${req.params.id} <br> category ${req.query.id}`)
   });
app.use('/',(req,res) =>{
    res.status(404)
    res.send('Page not Found')
})
app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 