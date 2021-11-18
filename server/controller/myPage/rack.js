const { Shelf, Book } = require("../../models");
const { token } = require("../serverFunctions");

module.exports = {
  get: (req, res) => {
    const user = token.isAuthorized(req);

    Shelf.findAll({
      where: { userId: user.id, isDoneReading: false },
    })
      .then((shelves) => {
        try {
          const bookIds = shelves.map((book) => book.dataValues.bookId);
          Book.findAll({
            attributes: [
              "id",
              "author",
              "publisher",
              "title",
              "coverimg",
              "description",
              "isbn13",
              "pages",
              "referred",
            ],
            where: { id: bookIds },
            raw: true,
          })
            .then((bookList) => {
              res.status(200).json({ books: bookList });
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        } catch {
          res.status(500).send();
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  post: async (req, res) => {
    const user = token.isAuthorized(req);
    if (req.body.pages && req.body.isbn13) {
      const [bookInfo, created] = await Book.findOrCreate({
        where: { isbn13: req.body.isbn13 },
        defaults: { ...req.body, referred: 1 },
      });
      if (!created) {
        const [exist, created] = await Shelf.findOrCreate({
          where: {
            bookId: bookInfo.dataValues.id,
            userId: user.id,
          },
          defaults: { isDoneReading: false },
        });
        if (!created) {
          res.status(409).send({
            requestFailure: {
              message: "already exist",
              book: bookInfo.dataValues,
            },
          });
        } else {
          Book.update(
            { referred: bookInfo.dataValues.referred + 1 },
            { where: { id: bookInfo.dataValues.id } }
          ).then((done) => {
            res.status(201).send({
              message: "Book is added to the rack",
              book: bookInfo.dataValues,
            });
          });
        }
      } else {
        Shelf.create({
          bookId: bookInfo.dataValues.id,
          userId: user.id,
          isDoneReading: false,
        })
          .then((response) => {
            res.status(201).send({
              message: "Book is added to the rack",
              book: bookInfo.dataValues,
            });
          })
          .catch((err) => {
            res.status(500).send();
          });
      }
    } else {
      res.status(500).send();
    }
  },

  delete: async (req, res) => {
    const user = token.isAuthorized(req);

    try {
      const bookId = req.params.bookid;
      const deletedBook = await Shelf.destroy({
        where: {
          bookId: bookId,
          userId: user.id,
          isDoneReading: false,
        },
      });
      if (!deletedBook) {
        res.status(410).send({ message: "Already deleted" });
      } else {
        const bookInfo = await Book.findByPk(bookId);
        if (bookInfo.dataValues.referred - 1 <= 0) {
          Book.destroy({ where: { id: bookId } }).then((response) => {
            res.status(204).send();
          });
        } else {
          Book.update(
            { referred: bookInfo.dataValues.referred - 1 },
            { where: { id: bookId } }
          ).then((response) => {
            res.status(204).send();
          });
        }
      }
    } catch {
      res.status(500).send();
    }
  },
};
