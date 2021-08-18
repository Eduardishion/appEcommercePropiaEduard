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

    await queryInterface.bulkInsert('Users', [
       {
        firstName: "Eduardo",
        lastName: "Isquierdo Rojas",
        email: "ferani_ed@hotmail.com",
        password: "$2a$10$XUVVStzh6w4s.2X2Gv.9ReglQSyjmQ8Hdt.JvJ7x81cd1X2dY3Rcy",
        category: " Administrador ",
        image: "imagenUsuario-1627502878024.png",
        registrationDate: "28/07/21",
        checkInTime: "12:00:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Luis",
        lastName: "Isquierdo Rojas",
        email: "alexmaxvedder1111@hotmail.com",
        password: "$2a$10$PTdbSteuVfOfUaWGoPrVAOgnwtFuweMeJrA6fe6nDBjXIRmIw6wT.",
        category: " Cliente ",
        image: "imagenUsuario-1627750169318.png",
        registrationDate: "31/07/21",
        checkInTime:  "12:00:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "EDU",
        lastName: "Isquierdo Rojas",
        email: "edi@gmail.com",
        password: "$2a$10$vv6AXjcRocCu7juOsLfC3ePAjr7X3psr1z97bD4kMTSaK.6PO9g0C",
        category: " Cliente ",
        image: "imagenUsuario-1627750393691.png",
        registrationDate: "31/07/21",
        checkInTime: "12:00:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "lalo",
        lastName: "Isquierdo Rojas",
        email: "sandi@gmail.com",
        password: "$2a$10$Lo6pJ6cpl/54w2ULVPq/t.dZZvciQ0t5Hc6Cr0qwnki7.881h9gIS",
        category: " Cliente ",
        image: "imagenUsuario-1627750656117.png",
        registrationDate: "31/07/21",
        checkInTime: "10:00:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Eduardo",
        lastName: "Izquierdo Rojas",
        email: "ed@hotmail.com",
        password: "$2a$10$/mQeERWa/eSSfQxTS7kKu.s8gw/T3EAle8HkxfAYHQzvRDGYaApg.",
        category: " Administrador ",
        image: "imagenUsuario-1628616171809.png",
        registrationDate: "10/08/21",
        checkInTime: "14:00:00",
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
     await queryInterface.bulkDelete('Users', null, {});
  }
};
