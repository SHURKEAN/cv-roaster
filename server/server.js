console.log("STARTING SERVER FILE ✅");
process.on("exit", (code) => console.log("PROCESS EXITED with code:", code));
process.on("uncaughtException", (err) => console.error("UNCAUGHT:", err));
process.on("unhandledRejection", (err) => console.error("UNHANDLED:", err));

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
const path = require("path");
const fetch = require("node-fetch");
globalThis.fetch = fetch;

// ✅ 1) Create app BEFORE using it
const app = express();

// ✅ 2) Middleware
app.use(cors());
app.use(express.json());

// ✅ 3) Serve frontend files
app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// ✅ 4) Groq setup
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// ✅ 5) Endpoint
app.post("/roast", async (req, res) => {
  try {
    const { cvText, tone } = req.body;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a professional CV roaster. Your tone is ${tone}.
Analyze the CV for these red flags: "Lorem Ipsum", lack of metrics (numbers), and length.

You MUST respond ONLY in the following JSON format:
{
  "roast": "Your witty paragraph here",
  "fixes": ["Fix 1", "Fix 2", "Fix 3"]
}`,
        },
        { role: "user", content: `Roast this CV text: ${cvText}` },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);

    res.json({
      roast: result.roast,
      fixes: result.fixes,
    });
  } catch (error) {
    console.error("Groq Error:", error);
    res
      .status(500)
      .json({ error: "The AI is currently taking a coffee break. Try again!" });
  }
});

// ✅ 6) Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅ Backend live at: http://localhost:${PORT}\n`);
});