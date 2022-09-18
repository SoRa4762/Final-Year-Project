const express = require("express");
const router = express.Router();
const { BloodStock } = require("../models");
// const { validateToken } = require("../middlewares/AuthMiddleware");

//getting info of all bloodstock from a single bloodbank profile
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const bloodStock = await BloodStock.findAll({
    where: { UserId: id },
  });

  res.json(bloodStock);
});

//editing amount
router.put("/:id", async (req, res) => {
  const { bloodType, amount } = req.body;
  const id = req.params.id;
  await BloodStock.update(
    {
      amount: amount,
    },
    { where: { bloodType: bloodType, UserId: id } }
  );
  res.json("Successfully Updated!");
});
module.exports = router;
