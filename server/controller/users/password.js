const { User } = require("../../models");
const {
  isAuthorized,
  generateAccessToken,
  sendAccessToken,
} = require("../serverFunctions");

module.exports = {
  patch: (req, res) => {
    console.log("users password:", req.body);
    // todo: 로직정리 -> 유효한토큰이 존재할경우 (이게 로그인이 되었다는증거가 되겠지?)
    // todo: 그때 그 current_password(req.body)가 new_password로 변경되어야한다?
    // TODO: 변경한패스워드와 패스워드확인 두 input이 모두 맞아야 하지만 이건 프론트에서 검증해서 넘겨준다.
    // TODO: 일단 body에 입력된 current, new 둘다 확인했는데..

    // todo: 둘중 뭐가 좋은지 내일 아침에 묻기
    // TODO: 그럼 db에 존재하는 데이터를 찾아서 변경하면 되려나
    // TODO: 비밀번호를 바꿔서 그걸 다시 토큰으로 바꿔서 던져하나?
    const { authorization } = req.cookies;
    const { email, password } = isAuthorized(req);
    console.log("토큰안에 데이터 :", email, password);
    //TODO: 여기는 현재 비밀번호와 토큰안에 비밀번호가 일치하지않으면 FAIL
    if (password !== req.body.current_password) {
      return res.status(401).send({ message: "Wrong password" });
    }
    // User.findOne({ where: { password } })
    //   .then((data) => {
    //     if (!data) {
    //       return res.status();
    //     }

    //     data.dataValues.password = req.body.new_password;
    //     console.log("ㅇㅁㅅㅁ:", data.dataValues);

    //     const accessToken = generateAccessToken(data.dataValues);
    //     sendAccessToken(res, accessToken);
    //     return res.send({ message: "ok" });
    //     // data.dataValues.password = req.body.new_password;
    //     // return res.send({ data, message: "ok" });
    //   })
    //   .catch((err) => {
    //     return res.status(500).send("Server err");
    //   });
    //TODO: 여기가 비밀번호가 일치할경우 NEWPASSWORD로 데이터 변경해주는 UPDATE부분
    User.update({ password: req.body.new_password }, { where: { email } })
      .then((data) => {
        return res.send({ message: "ok" });
      })
      // TODO: 여기는 서버에서 에러났을때 에러 잡아주는 부분
      .catch((err) => {
        return res.status(500).send("Server err");
      });
  },
};
