const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//registering
router.post("/register", validInfo, async (req, res) => {
  try {
    //1 sama seperti login, register juga mengambil data yang ada di form
    const { name, email, password } = req.body;
    //2 lalu mengecek apakah email tersebut sudah terdaftar atau belum
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    //apabila user.row.length nya tidak sama dengan 0 atau yang berarti ada email
    //yang terdaftar maka akan mengeluarkan notifikasi bahwa user sudah ada
    if (user.rows.length !== 0) {
      return res.status(401).send("User sudah terdaftar");
    }
    //3 saltround 10 berfungsi untuk hashing suatu password untuk mengubah data
    //agar password di acak selama 10 kali
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //4 lalu setelah selesai hashing data akan dimasukan kedalam tabel user yang ada pada database
    const newUser = await pool.query(
      "INSERT INTO users(user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, bcryptPassword]
    );

    //5 lalu tahan selanjutnya user akan masuk ke dashboard sama seperti login dan mendapatkan
    //token yang akan diberikan oleh jwtGenerator
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Errorrrrr");
  }
});

//login route
router.post("/login", validInfo, async (req, res) => {
  try {
    //1 ambil semua data yang tadi dikirim dari form
    const { email, password } = req.body;
    //2 cari dan ambil data yang user_emailnya sesuai sama data yang dimasukin dari form
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    //kalo rowsnya 0 atau ga ada datanya kasih notif kalo password ato emailnya salah
    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is Incorect");
    }
    //3 lalu ada fitur dari bcrypt yaitu compare yang berfungsi untuk 
    //membandingkan password yang benar dan pasword yang user masukan
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    //lalu kalau validpasswordnya false atau tidak ada maka sistem akan mengeluarkan
    //notifikasi bahwa email atau password salah
    if (!validPassword) {
      return res.status(401).json("Password or Email is Incorect");
    }

    //4 apabila email dan password benar maka sistem akan memberikan token yang sudah di generate oleh JWT
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
    //5
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Errorrr");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
