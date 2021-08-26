'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

      await queryInterface.bulkInsert('categories', [
        
        {
          category: 'Tableros',
          createdAt: "19/07/21",
          updatedAt: "19/07/21"
        },
        {
          category: 'Maquinitas',
          createdAt: "19/07/21",
          updatedAt: "19/07/21"
        },
        {
          category: 'Multijuegos',
          createdAt: "19/07/21",
          updatedAt: "19/07/21"
        }
        
      ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('categories', null, {});
  }
};
