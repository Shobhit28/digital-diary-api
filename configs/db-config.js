const mysql = require('mysql');
// initiate db connection
const connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "digital_diary",
});

connection.connect(function(err) {
  
});

module.exports = connection