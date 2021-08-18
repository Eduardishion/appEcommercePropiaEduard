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
    
      await queryInterface.bulkInsert('Products', [
        {
          name: "Maquinita Arcade Multijuegos Pacman 3288 Juegos",
          category: " Maquinitas ",
          price: 13500.50,
          discountRate: 12,
          discount: 11880,
          stock: 50,
          description: "Mueble Fabricado en Triplay\r\nLaminado antigraffiti Diseño Pacman\r\nSistema Pandora Box 9H 3D Internet\r\n3288 Juegos Arcade, modifica la dificultad!\r\nPantalla Led 19.5''\r\nPalancas Joystick Marca Calle Originales\r\nBotones Planos Material de Primera\r\nMicroswitch y Bocina Interna",
          image: "imagesProducto-1626710613282.webp",
          features: "Diseño del ploteo: Pac-Man, Número de sistemas: 1, Tipo de conexión: VGA, Tipo de pantalla: LED Ancho: 64.5 cm",
          registrationDate: "19/07/21",
          checkInTime: "11:00:00",
          userWhoRegistered: "Admin Root",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Micro Arcade Retro Con Juego Pac-man Micro Maquinita Clásica",
          category: " Maquinitas ",
          price: 2345,
          discountRate: 12,
          discount: 2063,
          stock: 20,
          description: "AC-MAN TM Micro Player TM\r\n\r\n\r\n¡Recoge todos los Pac-Dots y frutas, pero ten cuidado con los fantasmas! Blinky, Pinky, Inky y Clyde están buscando uno de los personajes más emblemáticos de los juegos, PAC-MAN TM . Originalmente lanzado en 1980, PAC-MAN TM a menudo es considerado como uno de los juegos de arcade más famosos y sigue siendo un elemento básico en las salas de juego de todo el mundo.\r\n\r\nPresenta obras de arte inspiradas en el gabinete arcade original.\r\nPantalla a todo color de 2.75 \"\r\nJoystick extraíble.\r\n¡Perfecto para cualquier sala de juegos, oficina o vitrina!\r\nControl de volumen y conector para auriculares de 3.5 mm.\r\nSe requieren 4 baterías AA o Micro-USB (no incluido)\r\n\r\nINCLUYE\r\nMicro Player, Guía del usuario\r\n\r\nNÚMERO\r\nDE ARTÍCULO DGUNL-3220\r\n\r\nUPC\r\n845620032204\r\n\r\nDIMENSIONES DE EMBALAJE\r\n4.50 x 8.50 x 5.00 in (W x H x D)\r\n11.43 x 21.59 x 12.7 cm\r\n\r\nPESO ENVASADO\r\n0.95 lb\r\n430 gramos\r\n\r\nDESCARGAS\r\nGuía del usuario\r\n\r\nPAC-MAN TM © BANDAI NAMCO Entertainment Inc.",
          image: "imagesProducto-1626802198911.webp",
          features: "Cantidad de piezas: 1, Incluye joystick: Sí, Incluye botones: Sí, Es kit: No",
          registrationDate: "19/07/21",
          checkInTime: "11:00:00",
          userWhoRegistered: "Admin Root",
          createdAt: new Date(),
          updatedAt: new Date()
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
     await queryInterface.bulkDelete('Products', null, {});
  }
};
