

'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    allowNull: false,
    unique:{
      msg:'Username already exists'
    },
    validate:{
      notEmpty:{args:true, msg: 'Please enter a username'},
      notNull:{args:true, msg: 'Please enter a username'
      }
    },

    email: DataTypes.STRING,
    allowNull: false,
    unique:{
      msg:'Email already in use'
    },
    validate:{
      notEmpty:{args:true, msg: 'Please enter your email'},
      notNull:{args:true, msg: 'Please enter your email'}
    },
    
    password: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty:{args:true, msg: 'Please enter your password'},
      notNull:{args:true, msg: 'Please enter your password'}
    },

    role: DataTypes.STRING,
    defaultValue:'viewer'

  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(user){
        user.password = hashPass(user.password)
      }
    }
  });
  return User;
};