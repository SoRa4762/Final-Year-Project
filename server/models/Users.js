module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // primaryKey: true, no change cuz it was the lastone
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: "noAvatar_cfhbv0",
    },
    coverPhoto: {
      type: DataTypes.STRING,
      defaultValue: "noCoverPhoto_ghqbbp",
    },
    totalDonation: {
      type: DataTypes.INTEGER,
    },
    creditScore: {
      type: DataTypes.INTEGER,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Comments, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Roles, {
      onDelete: "cascade",
    });

    Users.hasMany(models.BloodStock, {
      onDelete: "cascade",
    });

    Users.hasMany(models.TransactionHistory, {
      onDelete: "cascade",
    });
  };
  return Users;
};
