const mysql = require('mysql');
// initiate db connection
const connection = mysql.createPool({
  host: "",
  user: "",
  password: "",
  database: "",
});

module.exports = connection