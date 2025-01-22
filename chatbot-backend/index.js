// chatbot-backend/index.js

const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose(); // Use pg for PostgreSQL, or mysql for MySQL

const app = express();
const port = 3000;

// Database setup (SQLite for this example)
const db = new sqlite3.Database("./chatbot.db");

app.use(bodyParser.json());

// Endpoint to handle user messages
app.post("/chat", (req, res) => {
  const userMessage = req.body.message;
  console.log("User message: ", userMessage);

  // Query the database for a response
  db.get("SELECT response FROM chatbot_responses WHERE query = ?", [userMessage], (err, row) => {
    if (err) {
      res.status(500).send("Database query error");
      return;
    }
    if (row) {
      res.json({ reply: row.response });
    } else {
      res.json({ reply: "Sorry, I don't understand that." });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
