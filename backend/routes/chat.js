const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral",
      prompt: `You are a smart and friendly AI assistant for a numerology app.

Rules:
- If user says hi/hello → reply short friendly greeting (1-2 lines)
- If question is about numerology → give clear, accurate answer
- Keep answers crisp, not too long, not too short
- Use simple language
- Avoid unnecessary long explanations
- Stay mostly focused on numerology, but respond naturally to normal conversation

User: ${userMessage}
`,
      stream: false,
    });

    res.json({
      reply: response.data.response,
    });

  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({ error: "Chatbot error" });
  }
});

module.exports = router;