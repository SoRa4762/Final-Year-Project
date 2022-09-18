const express = require("express");
const router = express.Router();
// const { Op } = require("@sequelize/core");
const { Roles } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//!search from users side
//!Posting a Donor
router.post("/donor", validateToken, async (req, res) => {
  const { email, age, bloodType, phoneNumber, location, city, zip, disease } =
    req.body;
  const UserId = req.user.id;
  const profilePicture = req.user.profilePicture;
  const username = req.user.username;

  const foundDonor = await Roles.findOne({
    where: { UserId: UserId },
  });

  const appprovedDonor = await Roles.findOne({
    where: { UserId: UserId, role: "Donor", isApproved: true },
  });

  const appprovedReceiver = await Roles.findOne({
    where: { UserId: UserId, role: "Receiver", isApproved: true },
  });

  if (!foundDonor) {
    await Roles.create({
      UserId: UserId,
      profilePicture: profilePicture,
      username: username,
      age: age,
      email: email,
      bloodType: bloodType,
      phoneNumber: phoneNumber,
      location: location,
      city: city,
      zip: zip,
      disease: disease,
      role: "Donor",
      type: "user",
    });
    res.json("SUCCESS");
  } else if (appprovedReceiver) {
    await res.json({ error: "Your Role is Already Set as a Receiver." });
  } else if (appprovedDonor) {
    await res.json({ error: "Your Role is Already Set as a Donor." });
  } else {
    await res.json({ error: "You are Already on a Pending List." });
  }
});

//!Posting a Receiver
router.post("/receiver", validateToken, async (req, res) => {
  const {
    email,
    age,
    bloodType,
    phoneNumber,
    location,
    city,
    zip,
    reason,
    urgency,
  } = req.body;
  const UserId = req.user.id;
  const profilePicture = req.user.profilePicture;
  const username = req.user.username;

  const foundReceiver = await Roles.findOne({
    where: { UserId: UserId },
  });

  const appprovedReceiver = await Roles.findOne({
    where: { UserId: UserId, role: "Receiver", isApproved: true },
  });
  const appprovedDonor = await Roles.findOne({
    where: { UserId: UserId, role: "Donor", isApproved: true },
  });

  if (!foundReceiver) {
    await Roles.create({
      UserId: UserId,
      profilePicture: profilePicture,
      username: username,
      age: age,
      email: email,
      bloodType: bloodType,
      phoneNumber: phoneNumber,
      location: location,
      city: city,
      zip: zip,
      reason: reason,
      urgency: urgency,
      role: "Receiver",
      type: "user",
    });
    res.json("SUCCESS");
  } else if (appprovedReceiver) {
    await res.json({ error: "Your Role is Already Set as a Receiver." });
  } else if (appprovedDonor) {
    await res.json({ error: "Your Role is Already  Set as a Donor." });
  } else {
    await res.json({ error: "You are Already on a Pending List." });
  }
});

//!revert the role
router.delete("/revert", validateToken, async (req, res) => {
  const UserId = req.user.id;

  const found = await Roles.findOne({
    where: { UserId: UserId },
  });

  if (found) {
    await Roles.destroy({ where: { UserId: UserId } });
    res.json("Your Role Was Reverted Successfully!!");
  } else {
    await res.json({ error: "Your Role is Already Reverted!" });
  }
});

//!finding the donor by location and bloodtype
router.post("/getdonor", validateToken, async (req, res) => {
  const { bloodType, city } = req.body;

  const availableDonorBoth = await Roles.findAll({
    where: {
      bloodType: bloodType,
      city: city,
      role: "Donor",
      type: "user",
      isApproved: true,
    },
    attributes: { exclude: ["reason", "urgency"] },
  });

  if (availableDonorBoth) {
    // router.get("/donor", async (req, res) => {
    await res.json(availableDonorBoth);
    // });
  } else {
    await res.json({
      error: `There are no Donor with The Blood Type of ${bloodType} within ${city}`,
    });
  }
});

//!finding the donor only with bloodtype
router.post("/getdonor/bt", validateToken, async (req, res) => {
  const { bloodType } = req.body;

  const availableDonor = await Roles.findAll({
    where: {
      bloodType: bloodType,
      role: "Donor",
      type: "user",
      isApproved: true,
    },
    attributes: { exclude: ["reason", "urgency"] },
  });

  if (availableDonor) {
    await res.json(availableDonor);
  } else {
    await res.json({
      error: `There are no Donor with The Blood Type of ${bloodType}`,
    });
  }
});

//!finding the receiver by location and bloodtype
router.post("/getreceiver", validateToken, async (req, res) => {
  const { bloodType, city } = req.body;

  const availableReceiverBoth = await Roles.findAll({
    where: {
      bloodType: bloodType,
      city: city,
      role: "Receiver",
      type: "user",
      isApproved: true,
    },
    attributes: { exclude: ["disease"] },
  });

  //!seems like it works on testing.. nevermind not using it
  if (availableReceiverBoth) {
    // router.get("/receiver", async (req, res) => {
    await res.json(availableReceiverBoth);
    // });
  } else {
    // await res.json({
    //   error: `There are no Receiver with The Blood Type of ${bloodType} within ${location}`,
    // });
  }
});

//!finding the receiver only with bloodtype
router.post("/getreceiver/bt", validateToken, async (req, res) => {
  const { bloodType } = req.body;

  const availableReceiver = await Roles.findAll({
    where: {
      bloodType: bloodType,
      role: "Receiver",
      type: "user",
      isApproved: true,
    },
    attributes: {
      exclude: [
        "disease",
        //TODO:thinking some idea will try again later
        // "bloodType" === "O-",
        // "bloodType" === "A+",
        // "bloodType" === "B-",
        // "bloodType" === "AB-",
      ],
    },
  });

  if (availableReceiver) {
    await res.json(availableReceiver);
  } else {
  }
});

//BLOOD BANKKKKKKKKKKKKKKKKKK SIDE

//!Posting a Donor Bloodbank
router.post("/donorbb", validateToken, async (req, res) => {
  const { email, phoneNumber, location, city, zip } = req.body;
  const UserId = req.user.id;
  const profilePicture = req.user.profilePicture;
  const username = req.user.username;

  const foundDonor = await Roles.findOne({
    where: { UserId: UserId },
  });

  const appprovedDonor = await Roles.findOne({
    where: { UserId: UserId, isApproved: true },
  });

  if (!foundDonor) {
    await Roles.create({
      UserId: UserId,
      profilePicture: profilePicture,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      location: location,
      city: city,
      zip: zip,
      role: "Donor",
      type: "bloodbank",
    });
    res.json("SUCCESS");
  } else if (appprovedDonor) {
    await res.json({ error: "Your Role is Already as a Donor." });
  } else {
    await res.json({ error: "You are Already on a Pending List." });
  }
});

//!Posting a Receiver Bloodbank
router.post("/receiverbb", validateToken, async (req, res) => {
  const { email, phoneNumber, location, city, zip, reason, urgency } = req.body;
  const UserId = req.user.id;
  const profilePicture = req.user.profilePicture;
  const username = req.user.username;

  const foundReceiver = await Roles.findOne({
    where: { UserId: UserId },
  });

  const appprovedReceiver = await Roles.findOne({
    where: { UserId: UserId, isApproved: true },
  });

  if (!foundReceiver) {
    await Roles.create({
      UserId: UserId,
      profilePicture: profilePicture,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      location: location,
      city: city,
      zip: zip,
      reason: reason,
      urgency: urgency,
      role: "Receiver",
      type: "bloodbank",
    });
    res.json("SUCCESS");
  } else if (appprovedReceiver) {
    await res.json({ error: "Your Role is Already as a Receiver." });
  } else {
    await res.json({ error: "You are Already on a Pending List." });
  }
});

//!finding the donor bb by location
router.post("/getdonorbb", validateToken, async (req, res) => {
  const { city } = req.body;

  const availableDonorBoth = await Roles.findAll({
    where: {
      city: city,
      role: "Donor",
      type: "bloodbank",
      isApproved: true,
    },
    attributes: { exclude: ["reason", "urgency", "disease"] },
  });

  if (availableDonorBoth) {
    // router.get("/donor", async (req, res) => {
    await res.json(availableDonorBoth);
    // });
  } else {
    // await res.json({
    //   error: `There are no Donor with The Blood Type of ${bloodType} within ${location}`,
    // });
  }
});

//!finding the receiver bb by location
router.post("/getreceiverbb", validateToken, async (req, res) => {
  const { city } = req.body;

  const availableReceiverBoth = await Roles.findAll({
    where: {
      city: city,
      role: "Receiver",
      isApproved: true,
      type: "bloodbank",
    },
    attributes: { exclude: ["disease"] },
  });

  if (availableReceiverBoth) {
    await res.json(availableReceiverBoth);
  } else {
    // await res.json({
    //   error: `There are no Receiver with The Blood Type of ${bloodType} within ${location}`,
    // });
  }
});

//!For Admin
//!getting all users...

//!trying to get unapproved donor
router.get("/admin/donor", validateToken, async (req, res) => {
  const allDonorInfo = await Roles.findAll({
    where: { isApproved: false, role: "Donor", type: "user" },
    attributes: { exclude: ["reason", "urgency"] },
  });

  res.json(allDonorInfo);
});

//!trying to get unapproved receiver
router.get("/admin/receiver", validateToken, async (req, res) => {
  const allReceiverInfo = await Roles.findAll({
    where: { isApproved: false, role: "Receiver", type: "user" },
    attributes: { exclude: ["disease"] },
  });

  res.json(allReceiverInfo);
});

//!getting all approved donor
router.get("/alldonor", validateToken, async (req, res) => {
  const allDonor = await Roles.findAll({
    where: { role: "Donor", isApproved: true, type: "user" },
    attributes: { exclude: ["reason", "urgency"] },
  });
  await res.json(allDonor);
});

//!getting all approved receiver
router.get("/allreceiver", validateToken, async (req, res) => {
  const allReceiver = await Roles.findAll({
    where: { role: "Receiver", isApproved: true, type: "user" },
    attributes: { exclude: ["disease"] },
  });
  await res.json(allReceiver);
});

// bloodbank side for adminnnnnnnnnnn

//!trying to get unapproved donor bloodbank
router.get("/admin/donorbb", validateToken, async (req, res) => {
  const allDonorInfo = await Roles.findAll({
    where: { isApproved: false, role: "Donor", type: "bloodbank" },
    attributes: { exclude: ["reason", "urgency", "disease"] },
  });

  res.json(allDonorInfo);
});

//!trying to get unapproved receiver bb
router.get("/admin/receiverbb", validateToken, async (req, res) => {
  const allReceiverInfo = await Roles.findAll({
    where: { isApproved: false, role: "Receiver", type: "bloodbank" },
    attributes: { exclude: ["disease"] },
  });

  res.json(allReceiverInfo);
});

//globally applicable

//!getting all approved donor bb
router.get("/alldonorbb", validateToken, async (req, res) => {
  const allDonor = await Roles.findAll({
    where: { role: "Donor", isApproved: true, type: "bloodbank" },
    attributes: { exclude: ["reason", "urgency", "disease"] },
  });
  await res.json(allDonor);
});

//!getting all approved receiver bb
router.get("/allreceiverbb", validateToken, async (req, res) => {
  const allReceiver = await Roles.findAll({
    where: { role: "Receiver", isApproved: true, type: "bloodbank" },
    attributes: { exclude: ["disease"] },
  });
  await res.json(allReceiver);
});

//!trying to approve as donor or receiver
router.put("/admin/approve/:id", async (req, res) => {
  const id = req.params.id;
  await Roles.update({ isApproved: true }, { where: { id: id } });
  res.json("Successfully Approved!!");
});

//!trying to deny as donor or receiver
router.delete("/admin/deny/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Roles.destroy({ where: { id: id } });
  res.json("Successfully Denied!!");
});

module.exports = router;
