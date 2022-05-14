const jwt = require("jsonwebtoken")
require('dotenv').config();

//fungsi payload adalah variable yang menampung user yang berisi user_id yang login
//lalu pada expiresIn saya memberikan waktu selama 1 jam 
//sebelum user harus login ulang lagi atau tokennya hangus
function jwtGenerator(user_id){
    const payload = {
        user: user_id
    }
    return jwt.sign(payload, process.env.jwtSecret,{expiresIn:"1hr"})
}

module.exports = jwtGenerator