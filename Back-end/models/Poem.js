const mongoose = require("mongoose");

// Define a sub-schema for individual comments
const commentSchema = new mongoose.Schema({
  userEmail: String,
  text: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const poemSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [commentSchema], // ⬅️ New field for storing comments
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Poem", poemSchema);
