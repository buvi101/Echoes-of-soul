const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
