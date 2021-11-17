const { User } = require("../../models");
const { token } = require("../serverFunctions");

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      User.findOne({
        where: { email, password },
      })
        .then((data) => {
          if (!data) {
            res.status(401).send({ message: "Invalid user or Wrong password" });
          } else {
            delete data.dataValues.password;
            delete data.dataValues.createdAt;
            delete data.dataValues.updatedAt;
            const accessToken = token.generateAccessToken(data.dataValues);
            token.sendAccessToken(res, accessToken);
            res.send({ user: data.dataValues });
          }
        })
        .catch((err) => {
          res.status(500).send({ err, message: "Server err" });
        });
    } else {
      res.status(500).send({ message: "Server err" });
    }
  },
};
