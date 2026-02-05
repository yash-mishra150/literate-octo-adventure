const express = require('express')
const sql = require('mysql2/promise')

const app = express();

const pool = sql.createPool({
host: "db",
password: "root",
user: "root",
database: "testdb"
})

app.get('/api', async (req, res) => {
const [row] = await pool.query("select NOW() as time");
res.json(row[0]);
})

app.listen(3000, () => {
console.log("backend is running")
});


