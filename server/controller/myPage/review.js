const { Shelf } = require("../../models");
//const {함수이름} = require('../serverFunctions');

module.exports = {
  get: (req, res) => {
    //헤더 토큰 해독해서 로그인한 유저의 id 가져오기
    const userId = 2; // isAuthorized(req).id;

    //토큰이 없거나 유효하지 않음 401 코드 응답
    if (!userId) {
      res.status(401).send({ message: "access token expired" });
    } else {
      try {
        const bookId = req.params.bookid.split(":")[1];
        Shelf.findOne({
          where: { bookId: bookId, userId: userId, isDoneReading: true },
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
    }
  },

  patch: (req, res) => {
    //헤더 토큰 해독해서 로그인한 유저의 id 가져오기
    const userId = 2; // isAuthorized(req).id;

    if (!userId) {
      res.status(401).send({ message: "access token expired" });
    } else {
      try {
        const bookId = req.params.bookid.split(":")[1];
        Shelf.update(
          {
            review: req.body.review,
          },
          {
            where: { userId: userId, bookId: bookId, isDoneReading: true },
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
    }
  },

  delete: (req, res) => {
    const userId = 2; // isAuthorized(req).id;

    if (!userId) {
      res.status(401).send({ message: "access token expired" });
    } else {
      try {
        const bookId = req.params.bookid.split(":")[1];
        Shelf.update(
          {
            review: "",
          },
          {
            where: { userId: userId, bookId: bookId, isDoneReading: true },
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
    }
  },
};
