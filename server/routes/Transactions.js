const express = require("express");
const router = express.Router();
const { Op } = require("@sequelize/core");
const { TransactionHistory, Roles } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//posting a Request as donor(i am the donor)
router.post("/donorRequest", validateToken, async (req, res) => {
  const { UserId2 } = req.body;
  const UserId = req.user.id;

  const isDonor = await Roles.findOne({
    where: { UserId: UserId, role: "Donor", isApproved: true },
  });

  const isReceiver = await Roles.findOne({
    where: { UserId: UserId, role: "Receiver", isApproved: true },
  });

  const found = await TransactionHistory.findOne({
    where: { UserId: UserId, UserId2: UserId2 },
  });

  if (!found) {
    if (isReceiver) {
      res.json({ error: "You are a Receiver, You Cannot Donate!" });
    } else if (!isDonor) {
      res.json({ error: "You Should be a Donor First!" });
    } else if (isDonor) {
      const donorName = req.user.username;
      const donorProfilePicture = req.user.profilePicture;
      const bloodType = isDonor.bloodType;

      await TransactionHistory.create({
        donorName: donorName,
        donorProfilePicture: donorProfilePicture,
        bloodType: bloodType,
        UserId: UserId,
        UserId2: UserId2,
      });
      res.json({
        sentRequest: true,
        message: "The Request was Sent Successfully!",
      });
    }
  } else {
    await TransactionHistory.destroy({
      where: { UserId: UserId, UserId2: UserId2 },
    });
    res.json({
      sentRequest: false,
      message: "The Request was Unsent Successfully!",
    });
  }
});

//posting a Request as receiver(i am the receiver)
router.post("/receiverRequest", validateToken, async (req, res) => {
  const { UserId } = req.body;
  const UserId2 = req.user.id;

  const isReceiver = await Roles.findOne({
    where: { UserId: UserId2, role: "Receiver", isApproved: true },
  });

  const isDonor = await Roles.findOne({
    where: { UserId: UserId2, role: "Donor", isApproved: true },
  });

  const found = await TransactionHistory.findOne({
    where: { UserId: UserId, UserId2: UserId2 },
  });

  if (!found) {
    if (isDonor) {
      res.json({ error: "You are a Donor, You Cannot Recieve!" });
    } else if (!isReceiver) {
      res.json({ error: "You Should be a Receiver First!" });
    } else if (isReceiver) {
      const receiverName = req.user.username;
      const receiverProfilePicture = req.user.profilePicture;
      const bloodType = isReceiver.bloodType;

      await TransactionHistory.create({
        receiverName: receiverName,
        receiverProfilePicture: receiverProfilePicture,
        bloodType: bloodType,
        UserId: UserId,
        UserId2: UserId2,
        isComplete: false,
      });
      res.json({
        sentRequest: true,
        message: "The Request was Sent Successfully!",
      });
    }
  } else {
    await TransactionHistory.destroy({
      where: { UserId: UserId, UserId2: UserId2 },
    });
    res.json({
      sentRequest: false,
      message: "The Request was Unsent Successfully!",
    });
  }
});

//accepting donor request as a receiver
router.put("/donorRequestAccept/:id", async (req, res) => {
  const id = req.params.id;
  const { receiverName, receiverProfilePicture, UserId2 } = req.body;

  await TransactionHistory.update(
    {
      receiverName: receiverName,
      receiverProfilePicture: receiverProfilePicture,
      isComplete: true,
    },
    { where: { id: id } }
  );
  res.json("Donation Request Accepted Successfully!!");

  //trying to delete roles of both users after updating
  const deleteRoles = await TransactionHistory.findOne({
    where: {
      id: id,
    },
  });

  if (deleteRoles) {
    await Roles.destroy({
      where: { UserId: UserId2, UserId: deleteRoles.UserId },
    });
  }
});

//accepting receiver request as a donor
router.put("/receiverRequestAccept/:id", async (req, res) => {
  const id = req.params.id;
  const { donorName, donorProfilePicture, UserId } = req.body;

  await TransactionHistory.update(
    {
      donorName: donorName,
      donorProfilePicture: donorProfilePicture,
      isComplete: true,
    },
    { where: { id: id } }
  );
  res.json("Donation Request Accepted Successfully!!");

  //trying to delete roles of both users after updating
  // const UserId2 = req.user.id;
  const deleteRoles = await TransactionHistory.findOne({
    where: {
      id: id,
    },
  });

  if (deleteRoles) {
    await Roles.destroy({
      where: { UserId: UserId, UserId: deleteRoles.UserId2 },
    });
  }
});

//getting donation Requests (POV: You are the receiver)
router.get("/getDonationRequests", validateToken, async (req, res) => {
  const UserId2 = req.user.id;
  const gettingDonationRequests = await TransactionHistory.findAll({
    where: {
      UserId2: UserId2,
      isComplete: false,
    },
  });
  await res.json(gettingDonationRequests);
});

//getting receiver Requests (POV: You are the donor)
router.get("/getHelpRequests", validateToken, async (req, res) => {
  const UserId = req.user.id;
  const gettingHelpRequests = await TransactionHistory.findAll({
    where: {
      UserId: UserId,
      isComplete: false,
    },
  });
  await res.json(gettingHelpRequests);
});

//cancel request (POV: You are the donor or receiver should work for both)
router.delete("/cancelRequest/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await TransactionHistory.destroy({ where: { id: id } });
  res.json("Donation Request Canceled Successfully!!");
});

//get donor
router.get("/gettingDonors", validateToken, async (req, res) => {
  const UserId2 = req.user.id;
  const findDonors = await TransactionHistory.findAll({
    where: {
      UserId2: UserId2,
      isComplete: true,
    },
  });

  await res.json(findDonors);
  //! imma change the interface instead we are not going anywhere with this
  // if (findUsers) {
  //   const gettingUsers = await Roles.findAll({
  //     where: { UserId: findUsers.UserId },
  //     attributes: { exclude: ["disease", "urgency", "reason"] },
  //   });
  //   await res.json(gettingUsers);
  // }
});

//get receiver
router.get("/gettingReceivers", validateToken, async (req, res) => {
  const UserId = req.user.id;
  const findReceivers = await TransactionHistory.findAll({
    where: {
      UserId: UserId,
      isComplete: true,
    },
  });

  await res.json(findReceivers);
});

//!admin transaction history
router.get("/allhistory", validateToken, async (req, res) => {
  const allHistory = await TransactionHistory.findAll({
    where: {
      isComplete: true,
    },
  });
  await res.json(allHistory);
});

//!for others getting transaction history
router.get("/indiHistory", validateToken, async (req, res) => {
  // const id = req.params.id;
  const UserId = req.user.id;
  const indiHistory = await TransactionHistory.findAll({
    where: {
      isComplete: true,
      // where: { [Op.and]: [{ UserId: UserId }, { id: postId }] },
      [Op.or]: [{ UserId: UserId }, { UserId2: UserId }],
    },
  });
  await res.json(indiHistory);
});
module.exports = router;
