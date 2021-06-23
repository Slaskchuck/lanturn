'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tutors', [
      {
        email: 'sampleTutor@sample.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'sampleTutor1@sample.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'sampleTutor2@sample.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'sampleTutor3@sample.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tutors', null, {})
  }
};
