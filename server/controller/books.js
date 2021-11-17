const { Bestseller, Shelf, Book } = require("../models");
const { api, random } = require("./serverFunctions");

module.exports = {
  item: (req, res) => {
    try {
      const isbn = req.params.isbn;
      api.getSearchedItem(isbn, (item) => {
        if (item) {
          res.status(200).send(item);
        } else {
          res.status(501).send();
        }
      });
    } catch {
      res.status(500).send();
    }
  },

  list: (req, res) => {
    try {
      const keyword = req.params.keyword;

      api.getSearchList(keyword, 28, (searchList) => {
        if (searchList) {
          res.status(200).json({ books: searchList });
        } else {
          res.status(404).send({ message: "Resource not found" });
        }
      });
    } catch {
      res.status(500).send();
    }
  },

  bestseller: async (req, res) => {
    try {
      const { count, rows } = await Bestseller.findAndCountAll({ raw: true });
      console.log(count);
      const num = count < 10 ? count : 10;
      const index = random.uniqueRandomMaker(num, count);
      const bestsellerList = index.map((idx) => rows[idx]);
      res.status(200).json({ books: bestsellerList });
    } catch {
      res.status(500).send();
    }
  },

  users: async (req, res) => {
    try {
      const usersBooks = await Book.findAll({
        limit: 10,
        order: [["updatedAt", "DESC"]],
        raw: true,
      });
      res.send({ books: usersBooks });
    } catch {
      res.status(500).send();
    }
  },
};
