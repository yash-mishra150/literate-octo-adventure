import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "db",
  user: "appuser",
  password: "apppass",
  database: "feedbackdb",
  waitForConnections: true,
  connectionLimit: 10
});

// 🔥 WAIT FOR MYSQL TO BE READY
async function waitForDB() {
  while (true) {
    try {
      await pool.query("SELECT 1");
      console.log("✅ MySQL connected");
      break;
    } catch (err) {
      console.log("⏳ Waiting for MySQL...");
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

await waitForDB();

// ROUTES (only after DB is ready)
app.post("/api/feedback", async (req, res) => {
  const { name, email, rating, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required" });
  }

  await pool.query(
    "INSERT INTO feedback (name, email, rating, message) VALUES (?, ?, ?, ?)",
    [name, email, rating, message]
  );

  res.json({ success: true });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/feedback", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT name, message, rating, created_at FROM feedback ORDER BY created_at DESC"
  );
  res.json(rows);
});

app.listen(3000, '0.0.0.0', () => {
  console.log("🚀 Backend running on port 3000");
});

