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
      //book 테이블에 있는 책이면 아이디를 받아서 shelf 테이블에 있는지 조회, 없으면 추가
      if (!created) {
        const [exist, created] = await Shelf.findOrCreate({
          where: {
            bookId: bookInfo.dataValues.id,
            userId: user.id,
          },
          defaults: { isDoneReading: false },
        });

        //해당 유저의 Shelf에 이미 책이 있으면 409 금지 코드 응답
        if (!created) {
          res.status(409).send({
            requestFailure: {
              message: "already exist",
              book: bookInfo.dataValues,
            },
          });
        }
        //BookShelf에 추가되었으면 해당 책 book.referred ++
        else {
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
      }

      //book 테이블에 없으면 먼저 추가한 후 추가한 레코드의 아이디를 받아서 Shelf 테이블에 추가
      else {
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
    //헤더 토큰 해독해서 로그인한 유저의 id 가져오기
    const user = token.isAuthorized(req);

    try {
      const bookId = req.params.bookid;

      //Shelf에서 책 삭제 요청
      const deletedBook = await Shelf.destroy({
        where: {
          bookId: bookId,
          userId: user.id,
          isDoneReading: false,
        },
      });

      //지울 책이 Shelf에 없음 안지워짐
      if (!deletedBook) {
        res.status(410).send({ message: "Already deleted" });
      }

      //Shelf에서 지워진 경우 book에서도 지워야 할지 조회해야 함
      else {
        const bookInfo = await Book.findByPk(bookId);

        //참조횟수 - 1이 0보다 작은 경우 book에서 레코드 삭제
        if (bookInfo.dataValues.referred - 1 <= 0) {
          Book.destroy({ where: { id: bookId } }).then((response) => {
            res.status(204).send();
          });
        }
        //아니면 참조횟수만 1감소시킨 뒤 업데이트
        else {
          Book.update(
            { referred: bookInfo.dataValues.referred - 1 },
            { where: { id: bookId } }
          ).then((response) => {
            res.status(204).send();
          });
        }
      }
    } catch {
      //path 파라미터가 잘못된 경우, 받아온 bookId가 book 테이블에 존재하지 않는 경우,
      res.status(500).send();
    }
  },
};
