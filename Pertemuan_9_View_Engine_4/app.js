const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.get('/',(req,res) =>{
    cont =[
        {
            nama : '1',
            email : '1@gmail.com'
        },
        {
            nama : '2',
            email : '2@gmail.com'
        },
        {
            nama : '3',
            email : '3@gmail.com'
        },
        {
            nama : '4',
            email : '4@gmail.com'
        },
    ]
    res.render('index' ,{
        nama:'josrel chandra',
        title:'Home Page',
        cont,
    })
})
app.get('/about',(req,res) =>{    
    res.render('about',{
        title:'about page',
        tulisan: 'halo view engine about josrel'
    })
})
app.get('/contact',(req,res) =>{
    res.render('contact',{
        title:'contact page',
        tulisan: 'halo view engine contact josrel'
    })
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