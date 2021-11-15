const { User } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../serverFunctions");

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

            const accessToken = generateAccessToken(data.dataValues);
            sendAccessToken(res, accessToken);
            res.send({ user: data.dataValues });
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
