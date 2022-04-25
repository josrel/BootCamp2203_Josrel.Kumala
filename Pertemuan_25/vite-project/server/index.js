const express = require("express");
const app = express();
const port = 3001;
const pool = require("./db");
const controller = require("../ultis/controller");
const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  controller
    .getContact()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});


//semua kontak
app.get("/contact", async (req, res) => {
  try {
    const kontak = await pool.query(`SELECT * FROM users`);
    res.json(kontak.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//detail contact
app.get("/contact/:name", async (req, res) => {
  try {
    const { rows: listCont } = await pool.query(
      `SELECT * FROM users WHERE nama='${req.params.name}'`
    );
    listCont.map((detail) => res.json(detail));
  } catch (err) {
    console.error(err.message);
  }
});

//delete contact
app.delete("/contact/:id", async (req, res) => {
  try {
    await pool.query(`DELETE FROM users WHERE id='${req.params.id}'`);
    res.json("berhasil delete contact")
  } catch (err) {
    console.error(err.message);
  }
});

//add contact
app.post("/contact", async (req,res) => {
    try {
        const {name, telp, email} = req.body
        const newCont = await pool.query(`INSERT INTO users (nama,telp,email) values ('${name}','${telp}','${email}') RETURNING *`)
        res.json(newCont.rows)
        console.log(req.body)
    }
     catch (error) {
        console.error(error.message)
    }
})

//update contact
app.put("/contact/:id", async(req,res) => {
    try {
        const {updateNama, updateTelp,updateEmail } = req.body
        await pool.query(`UPDATE users SET nama='${updateNama}',telp='${updateTelp}',email='${updateEmail}' WHERE id='${req.params.id}'`)
        res.json("berhasil update contact !")
    } catch (error) {
        console.error(error.message)
    }
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
