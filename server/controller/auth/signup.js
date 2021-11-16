const { User } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { email, username, password } = req.body;
    if (email && username && password) {
      User.findOrCreate({
        where: { email },
        defaults: { password, username },
      })
        .then(([data, created]) => {
          if (!created) {
            //gitbook 응답으로 추가하기
            return res.status(401).send({ message: "exist email" });
          }

          delete data.dataValues.password;
          delete data.dataValues.updatedAt;
          delete data.dataValues.createdAt;

          res.status(201).send({ user: data.dataValues, message: "ok" });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      res.status(500).send();
    }
  },
};
