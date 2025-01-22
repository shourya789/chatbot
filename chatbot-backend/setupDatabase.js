// chatbot-backend/setupDatabase.js

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./chatbot.db");

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS chatbot_responses (id INTEGER PRIMARY KEY, query TEXT, response TEXT)");

  // Insert some sample queries and responses
  const stmt = db.prepare("INSERT INTO chatbot_responses (query, response) VALUES (?, ?)");
  stmt.run("hello", "Hi there! How can I assist you today?");
  stmt.run("What is AI?", "AI stands for Artificial Intelligence.");
  stmt.finalize();
});

db.close();
