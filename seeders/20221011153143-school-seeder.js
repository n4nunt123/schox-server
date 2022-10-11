"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const schools = [
          {
            name: "SMA 4 Tangerang",
            latitude: "-6.164544",
            longitude: "106.617353",
            address: "Jl. Padasuka I, RT.001/RW.004, Pabuaran Tumpeng, Kec. Karawaci, Kota Tangerang, Banten 15112",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "SMKN 2 Tangerang",
            latitude: "-6.185398089036927",
            longitude: "106.63720405332727",
            address: "Jl. Veteran No.2, RT.004/RW.011, Sukasari, Kec. Tangerang, Kota Tangerang, Banten 15118",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "SMAN 1 Tangerang",
            latitude: "-6.17000542441086",
            longitude: "106.63315517098994",
            address: "Jl. Raya Daan Mogot No.50, RT.001/RW.001, Sukarasa, Kec. Tangerang, Kota Tangerang, Banten 15111",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ];
        // console.log(schools);
        await queryInterface.bulkInsert("Schools", schools);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
