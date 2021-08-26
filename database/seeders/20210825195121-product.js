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

    await queryInterface.bulkInsert('products', [
      {
        name: "Maquinita Arcade Multijuegos Pacman 3288 Juegos",
        price: 13500,
        discountRate: 12,
        discount: 11880,
        stock: 50,
        description: "Mueble Fabricado en Triplay\r\nLaminado antigraffiti Diseño Pacman\r\nSistema Pandora Box 9H 3D Internet\r\n3288 Juegos Arcade, modifica la dificultad!\r\nPantalla Led 19.5''\r\nPalancas Joystick Marca Calle Originales\r\nBotones Planos Material de Primera\r\nMicroswitch y Bocina Interna",
        features: "Diseño del ploteo: Pac-Man, Número de sistemas: 1, Tipo de conexión: VGA, Tipo de pantalla: LED Ancho: 64.5 cm",
        registrationDate: "19/07/21",
        userWhoRegistered: "Admin Root",
        category_id: 2,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"

      },
      {
        name: "Maquinita Arcade Multijuegos Pacman 3288 Juegos",
        price: 13500,
        discountRate: 12,
        discount: 11880,
        stock: 50,
        description: "Mueble Fabricado en Triplay\r\nLaminado antigraffiti Diseño Pacman\r\nSistema Pandora Box 9H 3D Internet\r\n3288 Juegos Arcade, modifica la dificultad!\r\nPantalla Led 19.5''\r\nPalancas Joystick Marca Calle Originales\r\nBotones Planos Material de Primera\r\nMicroswitch y Bocina Interna",
        features: "Diseño del ploteo: Pac-Man, Número de sistemas: 1, Tipo de conexión: VGA, Tipo de pantalla: LED Ancho: 64.5 cm",
        registrationDate: "19/07/21",
        userWhoRegistered: "Admin Root",
        category_id: 2,
        createdAt: "19/07/21",
        updatedAt: "19/07/21"

      },
      {
        name: "Maquinita Arcade Multijuegos Pacman 3288 Juegos",
        price: 13500,
        discountRate: 12,
        discount: 11880,
        stock: 50,
        description: "Mueble Fabricado en Triplay\r\nLaminado antigraffiti Diseño Pacman\r\nSistema Pandora Box 9H 3D Internet\r\n3288 Juegos Arcade, modifica la dificultad!\r\nPantalla Led 19.5''\r\nPalancas Joystick Marca Calle Originales\r\nBotones Planos Material de Primera\r\nMicroswitch y Bocina Interna",
        features: "Diseño del ploteo: Pac-Man, Número de sistemas: 1, Tipo de conexión: VGA, Tipo de pantalla: LED Ancho: 64.5 cm",
        registrationDate: "19/07/21",
        userWhoRegistered: "Admin Root",
        category_id: 2,
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

     await queryInterface.bulkDelete('products', null, {});
  }
};
