const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact"); // Model to be created

// POST /api/contact - Save contact form data
router.post("/", async (req, res) => {
  try {
    const { Name, Email, Message } = req.body;

    const newContact = new Contact({ Name, Email, Message });
    await newContact.save();

    res.status(200).json({ message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
