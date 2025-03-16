const express = require("express");
const { addComment, getComments, deleteComment, editComment } = require("../controllers/commentController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, addComment);
router.get("/", getComments);
router.delete("/:id", authenticate, deleteComment);
router.put("/:id", authenticate, editComment);

module.exports = router;
