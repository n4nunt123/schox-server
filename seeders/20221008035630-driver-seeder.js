"use strict";

const { hashSync } = require("bcryptjs");

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
        const drivers = [
            {
                fullName: "Joe Murray",
                email: "joemurray@gmail.com",
                password: hashSync("password", 8),
                phoneNumber: "081222200531",
                carLicenseNumber: "B 1321 KZH",
                carType: "Tesla Model X",
                imgUrl: "https://t4.ftcdn.net/jpg/03/02/94/53/360_F_302945354_dqIiUiITKpard7fBVKDLtffIqnkDbyo4.jpg",
                carImgUrl:
                    "https://vexstockimages.fastly.carvana.io/stockimages/2016_TESLA_MODEL%20X_90D%20SPORT%20UTILITY%204D_WHITE_stock_desktop_1920x1080.png?v=1645564531.504",
                driverStatus: "Available",
                balance: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                fullName: "Chris J. Morgan",
                email: "chrismorgan@gmail.com",
                password: hashSync("password", 8),
                phoneNumber: "081222200532",
                carLicenseNumber: "B 1323 KZR",
                carType: "Tesla Model Y",
                imgUrl: "https://img.freepik.com/free-photo/happy-asian-man-standing-with-arms-crossed-grey-wall_171337-10467.jpg?w=2000",
                carImgUrl:
                    "https://vexstockimages.fastly.carvana.io/stockimages/2021_TESLA_MODEL%20Y_STANDARD%20RANGE%20SPORT%20UTILITY%204D_BLUE_stock_desktop_1920x1080.png?v=1647470549.080",
                driverStatus: "Available",
                balance: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                fullName: "Benny E. Jordan",
                email: "bennyjordan@gmail.com",
                password: hashSync("password", 8),
                phoneNumber: "081222200533",
                carLicenseNumber: "B 1321 KZE",
                carType: "Tesla Model S",
                imgUrl: "https://img.freepik.com/premium-photo/happy-man-with-clear-innocent-smile-face_39688-3130.jpg?w=2000",
                carImgUrl:
                    "https://vexstockimages.fastly.carvana.io/stockimages/2018_TESLA_MODEL%20S_P100D%20SEDAN%204D_GRAY_stock_desktop_1920x1080.png?v=1645557819.078",
                driverStatus: "Available",
                balance: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        // console.log(drivers);
        await queryInterface.bulkInsert("Drivers", drivers);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
         await queryInterface.bulkDelete('Drivers', null, {
          truncate: true,
          cascade: true,
          restartIdentity: true,
        });
    },
};
