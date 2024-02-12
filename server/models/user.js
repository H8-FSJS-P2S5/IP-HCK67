"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "fullname is require",
          },
          notEmpty: {
            msg: "fullname is require",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: " email must be unique",
          },
          notNull: {
            msg: "email is require",
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: " email must be unique",
          },
          notNull: {
            msg: "password is require",
          },
        },
      },

      status: { type: DataTypes.STRING, defaultValue: "basic" },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
