const express = require("express");
const router = express.Router();
const sampleParagraphs = require('../content/SampleParagraph')

router.get('/randomParagraph', (req, res) => {
  try {
    const randomNumber = Math.floor(Math.random() * sampleParagraphs.length);
    const data = sampleParagraphs[randomNumber].content;
    return res.status(200).json({ paragraph: data });
  } catch (error) {
    console.error("Error fetching random paragraph:", error);
    return res.status(500).json({ error: "An error occurred while fetching the paragraph." });
  }
});

module.exports = router;
