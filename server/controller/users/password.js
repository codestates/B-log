const { User } = require("../../models");
const { token } = require("../serverFunctions");

module.exports = {
  patch: (req, res) => {
    const userinfo = token.isAuthorized(req);
    if (!userinfo) {
      res.status(401).send({ message: "invalid access token" });
    } else if (req.body.newPassword) {
      const { id } = userinfo;
      User.findOne({ where: { id } })
        .then((user) => {
          if (user.dataValues.password !== req.body.currentPassword) {
            return res.status(401).send({ message: "Wrong password" });
          } else {
            User.update({ password: req.body.newPassword }, { where: { id } })
              .then((data) => {
                return res.send({ message: "ok" });
              })
              .catch((err) => {
                return res.status(500).send();
              });
          }
        })
        .catch((err) => {
          res.status(500).send();
        });
    } else {
      res.status(500).send();
    }
  },
};
