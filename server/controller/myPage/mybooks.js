const { Shelf, Book } = require("../../models");
//const {함수이름} = require('../serverFunctions');

module.exports = {
  get: (req, res) => {
    //헤더 토큰 해독해서 로그인한 유저의 id 가져오기
    const userId = 2; // isAuthorized(req).id;

    //토큰이 없거나 유효하지 않음 401 코드 응답
    if (!userId) {
      res.status(401).send({ message: "access token expired" });
    }

    //token decoded 성공한 경우
    else {
      //유저 아이디가 가지고 있는 모든 책의 아이디를 조회
      Shelf.findAll({
        where: { userId: userId },
      })
        .then((shelves) => {
          const bookList = [];
          try {
            if (!shelves.length) {
              res.status(200).send({ book: bookList });
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
};
