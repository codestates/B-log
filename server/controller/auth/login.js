const { User } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../serverFunctions");

module.exports = {
  post: (req, res) => {
    console.log("req body :", req.body);
    //todo: 요청이 날라오면 body에서 email, password만 가져와서
    const { email, password } = req.body;
    console.log("User :", User);
    //todo: user가 undefined네,, 뭐가 잘못됐어
    User.findOne({ where: { email, password } })
      //todo: user에서 해당 이메일과 password를 검색하고
      .then((data) => {
        console.log("data :", data);
        //todo: data가 없을경우 400번대 에러
        if (!data) {
          res.status(401).send({ message: "Invalid user or Wrong password" });
        }
        //todo: access token 발급하고 쿠키에 담아서 전달
        delete data.dataValues.password;
        const accessToken = generateAccessToken(data.dataValues);
        sendAccessToken(res, accessToken);
        res.send({ message: "ok" });
      })
      .catch((err) => {
        //todo: 여기는 서버 에러
        console.log(err);
      });
  },
};
