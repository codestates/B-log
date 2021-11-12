const { User } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../serverFunctions");

module.exports = {
  post: (req, res) => {
    User.findOne({
      where: { email: req.body.email, password: req.body.password },
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
          res.send({ user: data.dataValues }); //api 문서(수정필요)에 맞춰서 응답에 메세지는 지우고 유저 정보는 넣어주기
        }
      })
      .catch((err) => {
        res.status(500).send();
      });
  },
};
