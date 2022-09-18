module.exports = (sequelize, DataTypes) => {
  const TransactionHistory = sequelize.define("TransactionHistory", {
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    donorName: {
      type: DataTypes.STRING,
      //   allowNull: false,
    },
    donorProfilePicture: {
      type: DataTypes.STRING,
      //   allowNull: false,
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverName: {
      type: DataTypes.STRING,
      //   allowNull: false,
    },
    receiverProfilePicture: {
      type: DataTypes.STRING,
      //   allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return TransactionHistory;
};
