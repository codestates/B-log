const { User } = require("../../models");
const { isAuthorized } = require("../serverFunctions");

module.exports = {
  patch: (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      res.status(401).send({ message: "invalid access token" });
    } else {
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
                return res.status(500).send("Server err");
              });
          }
        })
        .catch((err) => {
          res.status(500).send();
        });
    }
  },
};
