const router = require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

router.get("/", authorization, async (req,res) => {
    try {
        // res.json(req.user)
        console.log(req.user)
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1",[req.user])
        res.json(user.rows[0])
        console.log(user.rows[0].user_email)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})


module.exports = router

