const { hashPass } = require('../helpers/bcrypt');


'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/users.json')
    console.log(data)
    data.map((el)=>{
      el.password = hashPass(el.password)
      el.createdAt = new Date ();
      el.updatedAt = new Date ();
    })
     await queryInterface.bulkInsert('Users', data,
       {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
