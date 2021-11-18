const { User } = require("../../models");
const { token } = require("../serverFunctions");
const { encryption } = require("../serverFunctions");

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      User.findOne({
        where: { email },
        raw: true,
      })
        .then((data) => {
          if (!data) {
            res.status(401).send({ message: "Invalid user or Wrong password" });
          } else {
            encryption.decrypt(res, password, data.password, (result) => {
              if (result) {
                delete data.password;
                delete data.createdAt;
                delete data.updatedAt;
                const accessToken = token.generateAccessToken(data);
                token.sendAccessToken(res, accessToken);
                res.send({ user: data });
              } else {
                res
                  .status(401)
                  .send({ message: "Invalid user or Wrong password" });
              }
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
