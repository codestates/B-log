const { Shelf } = require("../../models");
const { token } = require("../serverFunctions");

module.exports = {
  get: (req, res) => {
    //헤더 토큰 해독해서 로그인한 유저의 id 가져오기
    const user = token.isAuthorized(req);

    try {
      const bookId = req.params.bookid;
      Shelf.findOne({
        where: { bookId: bookId, userId: user.id, isDoneReading: true },
      })
        .then((shelfBook) => {
          console.log(shelfBook.dataValues);
          res.status(200).send({ data: shelfBook.dataValues.review || "" });
        })
        .catch((err) => {
          res.status(404).send({ message: "Resource not found" });
        });
    } catch {
      res.status(500).send();
    }
  },

  patch: (req, res) => {
    //헤더 토큰 해독해서 로그인한 유저의 id 가져오기
    const user = token.isAuthorized(req);

    try {
      const bookId = req.params.bookid;
      Shelf.update(
        {
          review: req.body.review,
        },
        {
          where: { userId: user.id, bookId: bookId, isDoneReading: true },
        }
      )
        .then((updated) => {
          if (updated[0]) {
            res.send({ data: req.body.review, message: "updated" });
          } else {
            res.status(404).send({ message: "Resource not found" });
          }
        })
        .catch((err) => {
          res.status(404).send({ message: "Resource not found" });
        });
    } catch {
      res.status(500).send();
    }
  },

  delete: (req, res) => {
    const user = token.isAuthorized(req);

    try {
      const bookId = req.params.bookid;
      Shelf.update(
        {
          review: "",
        },
        {
          where: { userId: user.id, bookId: bookId, isDoneReading: true },
        }
      )
        .then((deleted) => {
          res.status(204).send();
        })
        .catch((err) => {
          res.status(404).send({ message: "Resource not found" });
        });
    } catch {
      res.status(500).send();
    }
  },
};
