const { User } = require("../../models");
const {
  isAuthorized,
  sendAccessToken,
  generateAccessToken,
} = require("../serverFunctions");

module.exports = {
  patch: (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      res.status(401).send({ message: "invalid access token" });
    } else {
      if (req.body.username && req.body.username !== "") {
        User.update(
          { username: req.body.username },
          { where: { id: userinfo.id } }
        )
          .then((data) => {
            const accessToken = generateAccessToken({
              id: userinfo.id,
              username: req.body.username,
              email: userinfo.email,
            });
            sendAccessToken(res, accessToken);
            res.send({
              username: req.body.username,
              message: "ok",
            });
          })
          .catch((err) => {
            res.status(500).send("Server err");
          });
      } else {
        res.send({
          username: userinfo.username,
          message: "ok",
        });
      }
    }
  },
};
