const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.addComment = async (req, res) => {
  const { content } = req.body;

  const comment = await prisma.comment.create({
    data: { content, userId: req.userId },
  });

  res.json(comment);
};

exports.getComments = async (req, res) => {
  const comments = await prisma.comment.findMany({ include: { user: true } });
  res.json(comments);
};

exports.deleteComment = async (req, res) => {
  const comment = await prisma.comment.findUnique({
    where: { id: req.params.id },
  });

  if (!comment || comment.userId !== req.userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  await prisma.comment.delete({ where: { id: req.params.id } });
  res.json({ message: "Comment deleted" });
};

exports.editComment = async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  try {
    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to edit this comment" });
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });

    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
