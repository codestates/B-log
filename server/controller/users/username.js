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
    const { authorization } = req.cookies;
    console.log("req.body :", req.body);
    const { username } = isAuthorized(req);
    console.log("req.username :", username);
    //todo: 토큰안에 있는 USERNAME으로 서칭해서 해당 USERNAME을 요청받은 BODY.USERNAME으로 변경
    User.update({ username: req.body.username }, { where: { username } })
      .then((data) => {
        return res.json(data);
      })
      // TODO: 여기는 서버에서 에러났을때 에러 잡아주는 부분
      .catch((err) => {
        return res.status(500).send("Server err");
      });
  },
};
