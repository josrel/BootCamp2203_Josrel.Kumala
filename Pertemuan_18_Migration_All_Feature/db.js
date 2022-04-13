const Pool = require('pg').Pool

const pool = new Pool({
    user:"postgres",
    password:"1234",
    database:"db_contact",
    host:"localhost",
    port:5432
})


//   const detailUser = async ('/contact/:nama',(req, res) => {
//     try{
//         const selectnama = await pool.query(`SELECT nama FROM kontak where nama='${req.params.nama}'`)
//             res.render('detail',{
//             title:'detail page',
//             tulisan: 'halo view engine contact josrel',
//             layout: 'layout/expresslayout',
//             detail: selectnama.rows
//         })
//     }catch(err){
//     console.error(err.message)
//     }
//   }


module.exports = pool