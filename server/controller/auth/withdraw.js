const { User } = require("../../models");
const { isAuthorized } = require("../../controller/serverFunctions");

module.exports = {
  delete: async (req, res) => {
    // TODO: 로직정리 -> 요청이 날라오면
    // TODO: 근데 이걸 토큰으로 판단해야하나?
    // TODO: 유효한 토큰이 있을경우랑 비밀번호가 일치할경우
    // TODO: 토큰에 담긴 데이터를 바탕으로 User db에 검색해서
    // TODO: 해당 데이터를 삭제하고, 토큰삭제하고 (clearCookies)
    // TODO: 다시 첫 화면으로 돌아간다? -> 이친구는 클라이언트가,
    if (isAuthorized(req) === null) {
      console.log("어디서 에러가 난걸까1?");
      return res.status(401).send({ message: "invalid access token" });
    }
    // console.log("어디서 에러가 난걸까?");
    // console.log("withdraw req: ", req.cookies);
    // // TODO: 쿠키안에 authorization이 존재하는지
    // console.log("withdraw : ", isAuthorized(req));
    // // TODO: 그 쿠키로 원하는 데이터가 출력되는지
    // const { email, password } = isAuthorized(req);
    // console.log("이메일,패스워드", email, password);
    // const { authorization } = req.cookies;
    // console.log("어스오리제이션", authorization);
    // const DelteUser = await User.findOne({ where: { email, password } });
    // console.log("withdraw DelteUser:", DelteUser);
    // DelteUser.destory((data) => {
    //   console.log("withdraw data:", data);
    //   console.log("니가 에러일까요??");
    //   return res.status(205).send({ message: "ok" });
    // }).catch((err) => {
    //   console.log(err);
    // });
    try {
      const { email } = isAuthorized(req);
      console.log("데이터확인", isAuthorized(req));
      console.log("토큰안에 담긴 데이터", email);
      // TODO: 여기서 검색할때 이메일이 일치할경우
      const delteUser = await User.findOne({ where: { email } });
      console.log("딜리트유저", delteUser);
      delteUser.destroy().then((data) => {
        //todo: 데이터가 존재할경우 해당 쿠키 삭제와 데이터 삭제
        if (data) {
          res.clearCookie("authorization");
          res.status(205).send({ message: "ok" });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};
