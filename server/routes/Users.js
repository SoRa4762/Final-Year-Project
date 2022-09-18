const express = require("express");
const router = express.Router();
const { Op } = require("@sequelize/core");
const { Users, TransactionHistory } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//getting info of all users profile
router.get("/", validateToken, async (req, res) => {
  const allUsersInfo = await Users.findAll({
    where: { [Op.or]: [{ type: "user" }, { type: "bloodbank" }] },
    attributes: { exclude: ["password"] },
  });

  res.json(allUsersInfo);
});

//getting info of all bloodbanks profile
router.get("/bloodbanks", validateToken, async (req, res) => {
  const allBloodBanksInfo = await Users.findAll({
    where: { type: "bloodbank" },
    attributes: { exclude: ["password"] },
  });

  res.json(allBloodBanksInfo);
});

//getting info of all unapproved bloodbanks
router.get("/unbloodbanks", validateToken, async (req, res) => {
  const allUnBloodBanksInfo = await Users.findAll({
    where: { type: "bloodbank", isApproved: false },
    attributes: { exclude: ["password"] },
  });

  res.json(allUnBloodBanksInfo);
});

//yesRegister Bloodbank
router.put("/yesregister/:id", async (req, res) => {
  const id = req.params.id;
  await Users.update({ isApproved: true }, { where: { id: id } });
  res.json("The Bloodbank was Approved!!");
});

//noRegister Bloodbank
router.delete("/noregister/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Users.destroy({ where: { id: id } });
  res.json("The Approval was Denied!!");
});

//getting info of all bloodbank profile
router.get("/bloodbank", validateToken, async (req, res) => {
  const allUsersInfo = await Users.findAll({
    where: {
      type: "bloodbank",
    },
    attributes: { exclude: ["password"] },
  });

  res.json(allUsersInfo);
});

//getting info for indi profile
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const indiInfo = await Users.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });

  const totalDonation = await TransactionHistory.findAll({
    where: { UserId: id, isComplete: true },
  });

  res.json({ indiInfo: indiInfo, totalDonation: totalDonation });
});

//editing user profile
router.put("/:id", validateToken, async (req, res) => {
  const { coverPhoto, profilePicture, username, bio, location, id } = req.body;
  await Users.update(
    {
      coverPhoto: coverPhoto,
      profilePicture: profilePicture,
      username: username,
      bio: bio,
      location: location,
    },
    { where: { id: id } }
  );
  res.json("Successfully Updated!");
});

module.exports = router;
