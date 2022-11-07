const mysql2 = require("mysql2");
const pass = process.env.pass;

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "Water_tracker",
  password: pass,
});

db.connect((err) => {
  if (err) return err;
  return console.log(`Connected to database.. `);
});
module.exports = db;
