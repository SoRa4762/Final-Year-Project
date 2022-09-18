const express = require("express");
const router = express.Router();
const { Users, BloodStock } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

//User Registration
router.post("/", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const foundUser = await Users.findOne({
    where: { email: email },
  });

  if (!foundUser) {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        email: email,
        username: firstName + " " + lastName,
        password: hash,
        type: "user",
        isApproved: true,
      });
      res.json("SUCCESS");
    });
  } else {
    res.json({ error: "This User Already Exist!!" });
  }
});

//Blood Bank Registration
router.post("/bloodbank", async (req, res) => {
  const { email, bloodbank, password } = req.body;

  const foundBloodBank = await Users.findOne({
    where: { email: email },
  });

  if (!foundBloodBank) {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        email: email,
        username: bloodbank,
        password: hash,
        type: "bloodbank",
      });
      res.json("Success");
    });
  } else {
    res.json({ error: "This Blood Bank Already Exist!!" });
  }
});

//Users Login
router.post("/login", async (req, res) => {
  const { email, password, type } = req.body;

  const user = await Users.findOne({ where: { email: email, type: type } });
  const approved = await Users.findOne({
    where: { email: email, type: type, isApproved: true },
  });

  if (!user) {
    res.json({ error: "The User Doesn't Exist" });
  } else if (!approved) {
    res.json({
      error: "You Are on the Pending List! Please Wait for the Approval.",
    });
  } else {
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: "Wrong Email And Password Combination" });
      const accessToken = sign(
        {
          email: user.email,
          username: user.username,
          profilePicture: user.profilePicture,
          id: user.id,
          type: type,
        },
        "importantsecret"
      );

      if (type === "bloodbank") {
        const foundStock = await BloodStock.findOne({
          where: { UserId: user.id },
        });

        if (!foundStock) {
          BloodStock.bulkCreate([
            {
              bloodType: "A+",
              amount: 0,
              UserId: user.id,
            },
            {
              bloodType: "A-",
              amount: 0,
              UserId: user.id,
            },
            {
              bloodType: "B+",
              amount: 0,
              UserId: user.id,
            },
            {
              bloodType: "B-",
              amount: 0,
              UserId: user.id,
            },
            {
              bloodType: "AB+",
              amount: 0,
              UserId: user.id,
            },
            {
              bloodType: "AB-",
              amount: 0,
              UserId: user.id,
            },
            {
              bloodType: "O+",
              amount: 0,
              UserId: user.id,
            },
            {
              bloodType: "O-",
              amount: 0,
              UserId: user.id,
            },
          ]);
        } else {
        }
      }

      //returning accesstoken to frontend - login section cuz we need to set the authState inaccordance to these data
      res.json({
        token: accessToken,
        username: user.username,
        profilePicture: user.profilePicture,
        email: user.email,
        id: user.id,
        type: user.type,
      });
    });
  }
});

//final endpoint to check to see if the user is valid or not... (authenticated)
//!Also this code sends the data of user to the front end which we can use in anyway we want
router.get("/", validateToken, (req, res) => {
  res.json(req.user);
});

//changing password
router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { email: req.user.email } });

  if (!user) res.json({ error: "The User Doesn't Exist" });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) {
      res.json({ error: "Wrong Password Entered" });
    } else {
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update({ password: hash }, { where: { email: req.user.email } });
        res.json("Password Changed!");
      });
    }
  });
});

module.exports = router;
