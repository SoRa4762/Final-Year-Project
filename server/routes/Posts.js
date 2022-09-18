const express = require("express");
const router = express.Router();
const { Op } = require("@sequelize/core");
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//posting a post
router.post("/", validateToken, async (req, res) => {
  const { title, image, desc } = req.body;
  const UserId = req.user.id;
  await Posts.create({
    title: title,
    image: image,
    desc: desc,
    UserId: UserId,
  });
  res.json("Posted Successfully!!");
});

//updating a post
router.put("/", validateToken, async (req, res) => {
  const { title, image, desc, postId } = req.body;
  // const UserId = req.user.id;
  await Posts.update(
    {
      title: title,
      image: image,
      desc: desc,
    },
    {
      where: { id: postId },
    }
  );
  res.json("Posted Successfully!!");
});

//getting all posts
router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({
    include: [Likes],
  });
  // const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json(listOfPosts);
});

//getting a single post
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

// getting all post of single user
router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfIndiPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  // res.json({ listOfPosts: listOfPosts });
  res.json(listOfIndiPosts);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({ where: { id: postId } });
  res.json("deleted successfully!!");
});

module.exports = router;
