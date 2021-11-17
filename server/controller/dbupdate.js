const { api } = require("./serverFunctions");
const { Bestseller } = require("../models");
const { Op } = require("sequelize");

api.getBestsellerList({ QueryType: "BlogBest" }, (bestseller) => {
  bestseller.forEach((book) => {
    Bestseller.findOrCreate({
      where: { isbn13: book.isbn13 },
      defaults: book,
    });
  });
});

api.getBestsellerList({ QueryType: "ItemNewSpecial" }, (bestseller) => {
  bestseller.forEach((book) => {
    Bestseller.findOrCreate({
      where: { isbn13: book.isbn13 },
      defaults: book,
    });
  });
});

api.getBestsellerList(
  { QueryType: "ItemEditorChoice", CategoryId: 1 },
  (bestseller) => {
    bestseller.forEach((book) => {
      Bestseller.findOrCreate({
        where: { isbn13: book.isbn13 },
        defaults: book,
      });
    });
  }
);

Bestseller.max("id").then((max) => {
  if (max > 200) {
    Bestseller.destroy({
      where: {
        [Op.lte]: 200 - max,
      },
    });
  }
});
