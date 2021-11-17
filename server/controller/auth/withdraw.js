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

          Shelf.findAll({ where: { userId: userinfo.id } }).then((shelevs) => {
            if (shelevs) {
              shelevs.map((data, index) => {
                Shelf.destroy({ where: { userId: data.userId } })
                  .then((datas) => {
                    res.send();
                  })
                  .catch((err) => {
                    res.status(401).send(err);
                  });
                Book.findOne({ where: { id: data.bookId } }).then((books) => {
                  if (books.dataValues.referred === 1) {
                    Book.destroy({ where: { id: books.dataValues.id } })
                      .then((element) => {
                        res.status(200).send();
                      })
                      .catch((err) => {
                        res.status(500).send();
                      });
                  } else {
                    Book.update(
                      { referred: books.dataValues.referred - 1 },
                      { where: { id: books.dataValues.id } }
                    )
                      .then((dataelement) => {
                        return res.status(200).send();
                      })
                      .catch((err) => {
                        res.status(500).send();
                      });
                  }
                });
              });
              res.status(201).send();
            } else {
              return res.status(401).send({ message: "Not exist" });
            }
          });
        }
      } catch (err) {
        res.status(500).send();
      }
    }
  },
};
