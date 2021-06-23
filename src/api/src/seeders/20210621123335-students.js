'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Students', [
      {
        email: 'sampleStudent@sample.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'sampleStudent1@sample.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'sampleStudent2@sample.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'sampleStudent3@sample.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Students', null, {})
  }
};
