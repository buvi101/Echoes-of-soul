const express = require("express");
const router = express.Router();
const {
  createPoem,
  getAllPoems,
  updatePoem,
  deletePoem,
  toggleLike,
  getPoemById,
  addComment
} = require("../controllers/poemController");

router.post("/", createPoem);
router.get("/", getAllPoems);
router.put("/:id", updatePoem);
router.delete("/:id", deletePoem);
router.put("/like/:id", toggleLike); // new route for likes

router.get("/:id", getPoemById);
// router.get("/:id", require("../controllers/poemController").getPoemById);
router.post("/comment/:id", addComment);
module.exports = router;
