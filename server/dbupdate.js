const { api } = require("./controller/serverFunctions");
const { Bestseller } = require("./models");

api.getBestsellerList((bestseller) => {
  let count = 0;
  bestseller.forEach((book) => {
    Bestseller.findOrCreate({
      where: { isbn13: book.isbn13 },
      defaults: book,
    });
  });
});
