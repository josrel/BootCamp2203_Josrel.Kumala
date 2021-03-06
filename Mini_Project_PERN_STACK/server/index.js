const express = require("express");
const app = express();
const port = 3001;
const pool = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const morgan =  require('morgan')
const fs = require("fs")


const accessLogStream = fs.createWriteStream(__dirname + "/app.log",{flags:"a"})
app.use(express.json()); //ambil data dari req.body
app.use(cors());
app.use(morgan('combined',{
  stream : accessLogStream,
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join("", "public")));

//upload image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

app.post("/forumUpload/:id", upload.single("photo"), async (req, res) => {
  try {
    let finalImageURL = "/uploads/" + req.file.filename;
    console.log(req.params.id);
    res.json({ status: "success", image: finalImageURL });
    await pool.query(
      `UPDATE forum SET image='${finalImageURL}'WHERE id='${req.params.id}' `
    );
  } catch (error) {
    console.error(error.message);
  }
});

//ROUTES//

//REGISTER LOGIN ROUTES

app.use("/auth", require("./routes/jwtAuth"));

//DASHBOARD ROUTES
app.use("/dashboard", require("./routes/dashboard"));

//forum list
app.get("/forum", async (req, res) => {
  try {
    const forum_list = await pool.query(`
    SELECT * FROM forum
    `);
    res.json(forum_list.rows);
  } catch (error) {
    console.error(error.message);
  }
});
// add forum list
app.post("/forum", async (req, res) => {
  try {
    const { judul_forum, des_forum, name } = req.body;
    const newCont = await pool.query(
      `INSERT INTO forum (judul_forum,des_forum,creator,jam) 
      values ('${judul_forum}',
      '${des_forum}',
      '${name}',
      '${Date().replace(" GMT+0700 (Western Indonesia Time)","")}') 
      RETURNING *`
    );
    res.json(newCont.rows);
    // console.log(req.body);
  } catch (error) {
    console.error(error.message);
  }
});
//delete forum list
app.delete("/forum/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    await pool.query(`DELETE FROM forum WHERE id='${req.params.id}'`);
    res.json("berhasil delete contact");
  } catch (err) {
    console.error(err.message);
  }
});

//update forum list
app.put("/forum/:id", async (req, res) => {
  try {
    const { updateNama, updateTelp } = req.body;
    await pool.query(
      `UPDATE forum SET 
      judul_forum='${updateNama}',
      des_forum='${updateTelp}' 
      WHERE id='${req.params.id}'`
    );
    res.json("berhasil update contact !");
  } catch (error) {
    console.error(error.message);
  }
});

//list thread
app.get("/thread/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const thread_list = await pool.query(
      `SELECT * FROM thread where id_forum=${req.params.id}`
    );
    res.json(thread_list.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// add thread list
app.post("/thread", async (req, res) => {
  try {
    const { judul_thread, des_thread, name, id } = req.body;
    const newCont = await pool.query(
      `INSERT INTO thread (judul_thread,des_thread,creator,jam,id_forum) values ('
      ${judul_thread}',
      '${des_thread}',
      '${name}',
      '${Date().replace(" GMT+0700 (Western Indonesia Time)","")}',
      '${id}') RETURNING *`
    );
    res.json(newCont.rows);
    // console.log(req.body);
  } catch (error) {
    console.error(error.message);
  }
});

//delete thread list
app.delete("/thread/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    await pool.query(`DELETE FROM thread WHERE id='${req.params.id}'`);
    res.json("berhasil delete contact");
  } catch (err) {
    console.error(err.message);
  }
});

//list post
app.get("/post/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const thread_list = await pool.query(
      `SELECT * FROM thread where id=${req.params.id}`
    );
    res.json(thread_list.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//upload post
app.post("/thread/:id", upload.single("photo"), async (req, res) => {
  try {
    let finalImageURL = "/uploads/" + req.file.filename;
    console.log(req.params.id);
    res.json({ status: "success", image: finalImageURL });
    await pool.query(
      `UPDATE thread SET image='${finalImageURL}'WHERE id='${req.params.id}' `
    );
  } catch (error) {
    console.error(error.message);
  }
});

//update forum list
app.put("/thread/:id", async (req, res) => {
  try {
    const { updateNama, updateTelp } = req.body;
    await pool.query(
      `UPDATE thread SET 
      judul_thread='${updateNama}',
      des_thread='${updateTelp}' 
      WHERE id='${req.params.id}'`
    );
    res.json("berhasil update contact !");
  } catch (error) {
    console.error(error.message);
  }
});

//list comment
app.get("/comment/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const thread_list = await pool.query(
      `SELECT comment.*, users.*
      FROM comment join users
      on users.user_name = comment.user_comment
      where id_post=${req.params.id}`
    );
    res.json(thread_list.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//add comment
app.post("/comment", async (req, res) => {
  try {
    const { comment, name, id_post } = req.body;
    const newCont = await pool.query(
      `INSERT INTO comment 
      (comment,user_comment,jam_comment,id_post) 
      values ('${comment}',
      '${name}',
      '${Date().replace(" GMT+0700 (Western Indonesia Time)","")}','${id_post}') 
      RETURNING *`
    );
    res.json(newCont.rows);
    // console.log(req.body);
  } catch (error) {
    console.error(error.message);
  }
});

//delete comment
app.delete("/comment/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    await pool.query(`DELETE FROM comment WHERE comment='${req.params.id}'`);
    res.json("berhasil delete contact");
  } catch (err) {
    console.error(err.message);
  }
});

//update comment
app.put("/comment/:id", async (req, res) => {
  try {
    const { updateNama } = req.body;
    console.log(req.params.id)
    await pool.query(
      `UPDATE comment SET 
      comment='${updateNama}'
      WHERE comment='${req.params.id}'`
    );
    res.json("berhasil update contact !");
  } catch (error) {
    console.error(error.message);
  }
});

//edit profile
app.put("/profile/:id", async (req, res) => {
  try {
    const { updateNama,updateDepan,updateBelakang,updateNomor} = req.body;
    console.log(req.params.id)
    await pool.query(
      `UPDATE users SET 
      user_name='${updateNama}',
      first_name='${updateDepan}',
      last_name='${updateBelakang}',
      phone='${updateNomor}'
      WHERE user_name='${req.params.id}'`
    );
    res.json("berhasil update contact !");
  } catch (error) {
    console.error(error.message);
  }
});

//add profile picture
app.post("/profilepicture/:id", upload.single("photo"), async (req, res) => {
  try {
    let finalImageURL = "/uploads/" + req.file.filename;
    console.log(req.params.id);
    res.json({ status: "success", image: finalImageURL });
    await pool.query(
      `UPDATE users SET 
      image='${finalImageURL}'
      WHERE user_name='${req.params.id}' `
    );
  } catch (error) {
    console.error(error.message);
  }
});

//list users
app.get("/users/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const thread_list = await pool.query(
      `SELECT * FROM users where user_name='${req.params.id}'`
    );
    res.json(thread_list.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//user setting list
app.get("/usersetting", async (req, res) => {
  try {
    const forum_list = await pool.query(`
    SELECT * FROM users
    `);
    res.json(forum_list.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//user edit role sama nama
app.put("/usersetting/:id", async (req, res) => {
  try {
    const { updateNama,updateRole} = req.body;
    console.log(req.params.id)
    await pool.query(
      `UPDATE users SET 
      user_name='${updateNama}',
      role='${updateRole}'
      WHERE user_id='${req.params.id}'`
    );
    res.json("berhasil update contact !");
  } catch (error) {
    console.error(error.message);
  }
});


//delete user
app.delete("/usersetting/:id", async (req, res) => {
  try {
    console.log("halo")
    console.log(req.params.id);
    await pool.query(`DELETE FROM users WHERE user_id='${req.params.id}'`);
    res.json("berhasil delete contact");
  } catch (err) {
    console.error(err.message);
  }
});


app.listen(port, () => {
  console.log("server is running on port 3001");
});
