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

    await queryInterface.bulkInsert('images', [
    {
        image: "imagesProducto-1626710613282.webp",
        product_id: 1,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
    },
    {
        image: "imagesProducto-1626710613283.webp",
        product_id: 1,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
   
    },
    {
        image:"imagesProducto-1626710613284.webp",
        product_id: 1,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
        
    },
    {
        image: "imagesProducto-1626710613285.webp",
        product_id: 1,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
        
    },
    {
        image: "imagesProducto-1626710613286.webp",
        product_id: 1,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
    },
    




    {
        image: "imagesProducto-1626710613282.webp",
        product_id: 2,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
    },
    {
        image: "imagesProducto-1626710613283.webp",
        product_id: 2,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
   
    },
    {
        image:"imagesProducto-1626710613284.webp",
        product_id: 2,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
        
    },
    {
        image: "imagesProducto-1626710613285.webp",
        product_id: 2,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
        
    },
    {
        image: "imagesProducto-1626710613286.webp",
        product_id: 2,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
    },
    


    {
        image: "imagesProducto-1626710613282.webp",
        product_id: 3,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
    },
    {
        image: "imagesProducto-1626710613283.webp",
        product_id: 3,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
   
    },
    {
        image:"imagesProducto-1626710613284.webp",
        product_id: 3,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
        
    },
    {
        image: "imagesProducto-1626710613285.webp",
        product_id: 3,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
        
    },
    {
        image: "imagesProducto-1626710613286.webp",
        product_id: 3,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"
    },






    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('images', null, {});
  }
};
