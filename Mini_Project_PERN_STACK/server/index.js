const express = require("express");
const app = express();
const port = 3001;
const pool = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

app.use(express.json()); //ambil data dari req.body
app.use(cors());

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
    const tampung = await pool.query("SELECT MAX(id) from forum ")
    let finalImageURL = "/uploads/" + req.file.filename;
    res.json({ status: "success", image: finalImageURL });
    await pool.query(
      `UPDATE forum SET image='${finalImageURL}'WHERE id='${tampung.rows}' `
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
      `INSERT INTO forum (judul_forum,des_forum,creator,jam) values ('${judul_forum}','${des_forum}','${name}','${Date()}') RETURNING *`
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
      `UPDATE forum SET judul_forum='${updateNama}',des_forum='${updateTelp}' WHERE id='${req.params.id}'`
    );
    res.json("berhasil update contact !");
  } catch (error) {
    console.error(error.message);
  }
});


//list thread
app.get("/thread/:judul", async (req, res) => {
    try {
        console.log(req.params.judul)
    //   const forum_list = await pool.query(`SELECT * FROM forum`);
    //   res.json(forum_list.rows);
    } catch (error) {
      console.error(error.message);
    }
  });



  //list comment

//forum list
app.get("/comment", async (req, res) => {
    try {
      const comment_list = await pool.query(`
      SELECT *
      FROM comment
      `);
      res.json(comment_list.rows);
    } catch (error) {
      console.error(error.message);
    }
  });
//add comment
app.post("/comment", async (req, res) => {
    try {
      const { comment, name } = req.body;
      const newCont = await pool.query(
        `INSERT INTO comment (comment,user_comment,jam_comment) values ('${comment}','${name}','${Date()}') RETURNING *`
      );
      res.json(newCont.rows);
      // console.log(req.body);
    } catch (error) {
      console.error(error.message);
    }
  });

app.listen(port, () => {
  console.log("server is running on port 3001");
});
