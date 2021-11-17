const { User, Book, Shelf } = require("../../models");
const { token } = require("../../controller/serverFunctions");

module.exports = {
  delete: async (req, res) => {
    const userinfo = token.isAuthorized(req);
    if (!userinfo) {
      return res.status(401).send({ message: "invalid access token" });
    } else {
      try {
        const user = await User.findOne({
          where: { id: userinfo.id, password: req.body.password },
        });
        if (!user) {
          res.status(403).send({ message: "wrong password" });
        } else {
          //todo: 회원탈퇴시 User인포
          User.destroy({ where: { id: userinfo.id } })
            .then((data) => {
              if (data) {
                res.clearCookie("authorization", {
                  domain: process.env.CLIENT_DOMAIN,
                });
                res.status(204).send();
              }
            })
            .catch((err) => {
              res.status(500).send();
            });

          // Shelf 테이블에서 해당 유저아이디를 가진 리뷰검색
          Shelf.findAll({ where: { userId: userinfo.id } }).then((shelevs) => {
            if (shelevs) {
              // 해당 리뷰에서 검색
              shelevs.map((data, index) => {
                // 맞는 리뷰가 있을경우 삭제
                Shelf.destroy({ where: { userId: data.userId } })
                  .then((datas) => {
                    res.send();
                  })
                  .catch((err) => {
                    res.status(401).send(err);
                  });
                // 북데이터에서 해당 유저가 가지고있던 북 ID를 통해 책 검색
                Book.findOne({ where: { id: data.bookId } }).then((books) => {
                  // 참조가 1일경우 해당 책 데이터 삭제
                  if (books.dataValues.referred === 1) {
                    Book.destroy({ where: { id: books.dataValues.id } })
                      .then((element) => {
                        res.status(200).send();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else {
                    // 참조가 1이 아닐경우 -1
                    Book.update(
                      { referred: books.dataValues.referred - 1 },
                      { where: { id: books.dataValues.id } }
                    )
                      .then((dataelement) => {
                        return res.status(200).send();
                      })
                      .catch((err) => {
                        res.send(err);
                      });
                  }
                });
              });
              res.status(201).send();
            } else {
              return res.status(401).send({ message: "Not exist Reviwes" });
            }
          });
        }
      } catch (err) {
        res.status(500).send({ err, message: "Server err" });
      }
    }
  },
};
