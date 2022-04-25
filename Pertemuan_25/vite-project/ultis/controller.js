const pool = require("../server/db");

async function hapuskontak(element) {
  try {
    await pool.query(`DELETE FROM kontak WHERE nama='${element}'`);
  } catch (err) {
    return err.stack;
  }
}
const getContact = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

module.exports = {
  hapuskontak,
  getContact
};
