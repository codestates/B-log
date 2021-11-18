const { User } = require("../../models");
const { token } = require("../serverFunctions");
const { encryption } = require("../serverFunctions");

module.exports = {
  patch: (req, res) => {
    const userinfo = token.isAuthorized(req);
    if (req.body.newPassword) {
      const { id } = userinfo;
      User.findOne({ where: { id } })
        .then((user) => {
          encryption.decrypt(
            res,
            req.body.currentPassword,
            user.dataValues.password,
            (result) => {
              if (!result) {
                return res.status(401).send({ message: "Wrong password" });
              } else {
                encryption.encrypt(res, req.body.newPassword, (hash) => {
                  User.update({ password: hash }, { where: { id } })
                    .then((data) => {
                      return res.send({ message: "ok" });
                    })
                    .catch((err) => {
                      return res.status(500).send();
                    });
                });
              }
            }
          );
        })
        .catch((err) => {
          res.status(500).send();
        });
    } else {
      res.status(500).send();
    }
  },
};
