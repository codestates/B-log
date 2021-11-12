const { User } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../serverFunctions");
module.exports = {
  post: (req, res) => {
    const { email, username, password } = req.body;
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

        const accessToken = generateAccessToken(data.dataValues);
        sendAccessToken(res, accessToken);
        res.status(201).send({ user: data.dataValues, message: "ok" });
      })
      .catch((err) => {
        res.status(500).send({ message: "err" });
      });
  },
};
