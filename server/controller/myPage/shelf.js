const { Shelf, Book } = require("../../models");
const { isAuthorized } = require("../serverFunctions");

module.exports = {
  get: (req, res) => {
    //헤더 토큰 해독해서 로그인한 유저의 id 가져오기
    const userId = isAuthorized(req).id;

    //토큰이 없거나 유효하지 않음 401 코드 응답
    if (!userId) {
      res.status(401).send({ message: "access token expired" });
    }

    //token decoded 성공한 경우
    else {
      //유저 아이디가 가지고 있는 모든 책의 아이디를 조회
      Shelf.findAll({
        where: { userId: userId, isDoneReading: true },
      })
        .then((shelves) => {
          const bookList = [];
          try {
            if (!shelves.length) {
              res.status(200).send({ books: bookList });
            } else {
              //조회한 배열을 순회한다
              shelves.map((book, index) => {
                //아이디에 해당하는 책 정보를 불러온다
                Book.findByPk(book.dataValues.bookId)
                  .then((bookInfo) => {
                    //필요 없는 데이터를 지우고 응답할 배열에 넣어 줌
                    const data = bookInfo.dataValues;
                    delete data.createdAt;
                    delete data.updatedAt;
                    bookList.push(data);

                    //마지막 요소까지 순회했을 때 도서 정보 배열과 함께 200 코드로 응답
                    if (index === shelves.length - 1) {
                      res.status(200).json({ books: bookList });
                    }
                  })
                  .catch((err) => {
                    res.status(500).send();
                  });
              });
            }
          } catch {
            res.status(500).send();
          }
        })
        .catch((err) => {
          res.status(500).send();
        });
    }
  },

  post: async (req, res) => {
    //헤더 토큰 해독해서 로그인한 유저의 id 가져오기
    const userId = isAuthorized(req).id;

    //토큰이 없거나 유효하지 않음 401 코드 응답
    if (!userId) {
      res.status(401).send({ message: "access token expired" });
    }

    //token decoded 성공한 경우
    else {
      //요청으로 받은 정보와 일치하는 책이 book 테이블에 있는지 찾는다
      const bookInfo = await Book.findOne({
        where: { isbn13: req.body.isbn13 },
      });

      //book 테이블에 있는 책이면 아이디를 받아서 shelf 테이블에 있는지 조회, 없으면 추가
      if (bookInfo) {
        //shelf에 일치하는 레코드가 있는지 찾기
        const exist = await Shelf.findOne({
          where: {
            bookId: bookInfo.dataValues.id,
            userId: userId,
          },
        });

        //해당 유저의 Shelf에 이미 책이 있으면 409 금지 코드 응답
        if (exist) {
          res.status(409).send({
            requestFailure: {
              message: "already exist",
              book: bookInfo.dataValues,
            },
          });
        }

        //없으면 BookShelf에 추가, 해당 책 book.referred ++
        else if (req.body.pages && req.body.isbn13) {
          Book.update(
            { referred: bookInfo.dataValues.referred + 1 },
            { where: { id: bookInfo.dataValues.id } }
          )
            .then((updatedBook) => {
              Shelf.create({
                bookId: bookInfo.dataValues.id,
                userId: userId,
                isDoneReading: true,
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
            })
            .catch((err) => {
              res.status(500).send();
            });
        } else {
          res.status(500).send();
        }
      }

      //book 테이블에 없으면 먼저 추가한 후 추가한 레코드의 아이디를 받아서 Shelf 테이블에 추가
      else {
        Book.create({ ...req.body, referred: 1 })
          .then((newBook) => {
            //Shelf 테이블에 추가
            Shelf.create({
              bookId: newBook.dataValues.id,
              userId: userId,
              isDoneReading: true,
            });
          })
          .then((response) => {
            res.status(201).send({
              message: "Book is added to the rack",
              book: newBook.dataValues,
            });
          })
          .catch((err) => {
            res.status(500).send();
          });
      }
    }
  },

  delete: async (req, res) => {
    //헤더 토큰 해독해서 로그인한 유저의 id 가져오기
    const userId = isAuthorized(req).id;

    //토큰이 없거나 유효하지 않음 401 코드 응답
    if (!userId) {
      res.status(401).send({ message: "access token expired" });
    }

    //토큰 존재
    else {
      try {
        const bookId = req.params.bookid.split(":")[1];

        //Shelf에서 책 삭제 요청
        const deletedBook = await Shelf.destroy({
          where: {
            bookId: bookId,
            userId: userId,
            isDoneReading: true,
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
    }
  },
};
