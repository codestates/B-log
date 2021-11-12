"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "김코딩",
          password: "1234",
          email: "coding@gg.com",
        },
        {
          username: "김토끼",
          password: "qwer",
          email: "rabbit@gg.com",
        },
        {
          username: "김멍멍",
          password: "password",
          email: "love@gg.com",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
