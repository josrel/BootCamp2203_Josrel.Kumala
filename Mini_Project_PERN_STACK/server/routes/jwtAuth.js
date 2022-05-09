const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//registering
router.post("/register", validInfo, async (req, res) => {
  try {
    //1
    const { name, email, password } = req.body;
    //2
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User sudah terdaftar");
    }
    //3
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //4
    const newUser = await pool.query(
      "INSERT INTO users(user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, bcryptPassword]
    );

    //5
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
    //1
    const { email, password } = req.body;
    //2
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is Incorect");
    }
    //3
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Password or Email is Incorect");
    }

    //4
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
