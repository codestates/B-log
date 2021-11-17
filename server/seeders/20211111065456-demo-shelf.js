"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Shelves",
      [
        {
          bookId: 1,
          userId: 2,
          isDoneReading: true,
        },
        {
          bookId: 2,
          userId: 2,
          isDoneReading: true,
          review: "리뷰 데이터",
        },
        {
          bookId: 3,
          userId: 2,
          isDoneReading: true,
        },
        {
          bookId: 4,
          userId: 2,
          isDoneReading: false,
        },
        {
          bookId: 5,
          userId: 2,
          isDoneReading: false,
        },
        {
          bookId: 2,
          userId: 1,
          isDoneReading: false,
        },
        {
          bookId: 2,
          userId: 3,
          isDoneReading: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Shelves", null, {});
  },
};
