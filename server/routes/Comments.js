const express = require("express");
const router = express.Router();
const { Op } = require("@sequelize/core");
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//getting comment
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

//post comment
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  //getting id from middleware
  const UserId = req.user.id;
  const profilePicture = req.user.profilePicture;
  const username = req.user.username;
  comment.UserId = UserId;
  comment.profilePicture = profilePicture;
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});

//update comment
router.put("/:commentId", validateToken, async (req, res) => {
  const { commentBody } = req.body;
  //getting id from middleware
  const commentId = req.params.commentId;
  const UserId = req.user.id;
  const profilePicture = req.user.profilePicture;
  const username = req.user.username;
  await Comments.update(
    {
      commentBody: commentBody,
      profilePicture: profilePicture,
      username: username,
    },
    {
      where: { [Op.and]: [{ id: commentId }, { UserId: UserId }] },
    }
  );
  res.json("Successfully Updated!");
});

//delete comment
router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({ where: { id: commentId } });
  res.json("deleted successfully!!");
});

module.exports = router;
