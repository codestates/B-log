const { User } = require("../../models");
const { token } = require("../serverFunctions");

module.exports = {
  patch: (req, res) => {
    const userinfo = token.isAuthorized(req);

    if (req.body.username && req.body.username !== "") {
      User.update(
        { username: req.body.username },
        { where: { id: userinfo.id } }
      )
        .then((data) => {
          const accessToken = token.generateAccessToken({
            id: userinfo.id,
            username: req.body.username,
            email: userinfo.email,
          });
          token.sendAccessToken(res, accessToken);
          res.send({
            username: req.body.username,
            message: "ok",
          });
        })
        .catch((err) => {
          res.status(500).send();
        });
    } else {
      res.send({
        username: userinfo.username,
        message: "ok",
      });
    }
  },
};
