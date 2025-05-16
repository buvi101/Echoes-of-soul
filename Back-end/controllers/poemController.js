const Poem = require("../models/Poem");

// Create a new poem
const createPoem = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ message: "Title, content, and author are required." });
    }

    const newPoem = new Poem({ title, content, author });
    await newPoem.save();
    res.status(201).json(newPoem);
  } catch (err) {
    console.error("Error creating poem:", err);
    res.status(500).json({ message: "Failed to post poem" });
  }
};

// Get all poems (with optional author filter)
const getAllPoems = async (req, res) => {
  try {
    const { author } = req.query;
    const query = author ? { author } : {};
    const poems = await Poem.find(query).sort({ createdAt: -1 });
    res.status(200).json(poems);
  } catch (err) {
    console.error("Error fetching poems:", err);
    res.status(500).json({ message: "Failed to fetch poems" });
  }
};

// Get a single poem by ID
const getPoemById = async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    res.status(200).json(poem);
  } catch (err) {
    console.error("Error fetching poem:", err);
    res.status(500).json({ message: "Failed to fetch poem" });
  }
};

// Update a poem by ID
const updatePoem = async (req, res) => {
  try {
    const updatedPoem = await Poem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPoem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    res.status(200).json(updatedPoem);
  } catch (err) {
    console.error("Error updating poem:", err);
    res.status(500).json({ message: "Failed to update poem" });
  }
};

// Delete a poem by ID
const deletePoem = async (req, res) => {
  try {
    const deletedPoem = await Poem.findByIdAndDelete(req.params.id);
    if (!deletedPoem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    res.status(200).json({ message: "Poem deleted successfully" });
  } catch (err) {
    console.error("Error deleting poem:", err);
    res.status(500).json({ message: "Failed to delete poem" });
  }
};

// Toggle like/unlike
const toggleLike = async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    const { userEmail } = req.body;

    if (!poem) return res.status(404).json({ message: "Poem not found" });
    if (!userEmail) return res.status(400).json({ message: "userEmail is required" });

    if (poem.likes.includes(userEmail)) {
      return res.status(400).json({ message: "User already liked this poem" });
    }

    poem.likes.push(userEmail);
    await poem.save();

    res.status(200).json({ message: "Liked", likes: poem.likes });
  } catch (err) {
    console.error("Error toggling like:", err);
    res.status(500).json({ message: "Error toggling like", error: err.message });
  }
};

// Add a comment to a poem
const addComment = async (req, res) => {
  try {
    const { userEmail, text } = req.body;
    const poem = await Poem.findById(req.params.id);

    if (!poem) return res.status(404).json({ message: "Poem not found" });
    if (!userEmail || !text || !text.trim()) {
      return res.status(400).json({ message: "userEmail and valid comment text are required" });
    }

    const newComment = { userEmail, text };
    poem.comments.push(newComment);
    await poem.save();

    const addedComment = poem.comments[poem.comments.length - 1];
    res.status(200).json({ message: "Comment added", comment: addedComment });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
};

module.exports = {
  createPoem,
  getAllPoems,
  updatePoem,
  deletePoem,
  toggleLike,
  getPoemById,
  addComment,
};
