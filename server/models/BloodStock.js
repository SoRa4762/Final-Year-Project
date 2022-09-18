module.exports = (sequelize, DataTypes) => {
  const BloodStock = sequelize.define("BloodStock", {
    bloodType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return BloodStock;
};
