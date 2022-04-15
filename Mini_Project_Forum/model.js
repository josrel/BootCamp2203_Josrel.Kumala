// //LIST SEMUA KONTAK

// const listcontact = async ('/contact',(req,res) => {
//     try{
//         const {rows : kontaks} = await pool.query(`SELECT * FROM kontak`)
//                res.render('contact',
//                {
//                    title:'contact page',
//                    tulisan: 'halo view engine contact josrel',
//                    layout: 'layout/expresslayout',
//                    kontaks,
//                    msg: req.flash('msg')
//                })
//             }catch(err){
//             console.error(err.message)
//     }
// })

//   module.exports = {
//     listcontact
//   }