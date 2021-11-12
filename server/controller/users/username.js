const { User } = require("../../models");
const {
  isAuthorized,
  generateAccessToken,
  sendAccessToken,
} = require("../serverFunctions");

module.exports = {
  patch: (req, res) => {
    // todo: 로직정리 -> 클라이언트에서 닉네임을 변경하고 patch 요청이 날라오면
    // todo: authorization안에 담긴 데이터 해석해서 그 안에 username 변경
    // todo: 이런 로직으로 가면 될꺼같은데
    console.log("졸려죽겠다.");
    const { authorization } = req.cookies;
    console.log("req.body :", req.body);
    isAuthorized(req).username = req.body.username;
    console.log();
    console.log("변경후", isAuthorized(req));
    res.send();
  },
};
