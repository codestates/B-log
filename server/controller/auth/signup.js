const { User } = require("../../models");
const { encryption } = require("../serverFunctions");

module.exports = {
  post: (req, res) => {
    const { email, username, password } = req.body;
    if (email && username && password) {
      encryption.encrypt(res, password, (hash) => {
        User.findOrCreate({
          where: { email },
          defaults: { password: hash, username: username },
        })
          .then(([data, created]) => {
            if (!created) {
              return res.status(409).send({ message: "exist email" });
            }
            delete data.dataValues.password;
            delete data.dataValues.updatedAt;
            delete data.dataValues.createdAt;
            res.status(201).send({ user: data.dataValues, message: "ok" });
          })
          .catch((err) => {
            res.status(500).send();
          });
      });
    } else {
      res.status(500).send();
    }
  },
};
