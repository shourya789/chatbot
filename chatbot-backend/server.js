const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create an OpenAI client
const openai = new OpenAI({
  const apiKey = process.env.OPENAI_API_KEY;

});

// Route to handle messages
app.post("/message", async (req, res) => {
  try {
    const userMessage = req.body.userMessage;
    console.log("User message received:", userMessage);  // Debugging line

    // Call the OpenAI API with a prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can use other models like "gpt-4" if needed
      messages: [{ role: "user", content: userMessage }],
    });

    // Log the response for debugging
    console.log("OpenAI response:", response);

    // Send the response back to the client
    res.json({
      botMessage: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error processing message:", error); // Log the full error
    res.status(500).json({
      error: "Something went wrong",
      message: error.message,  // Include the error message in the response for more clarity
      stack: error.stack,      // Include the stack trace for better debugging
    });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
