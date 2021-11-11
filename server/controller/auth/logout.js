module.exports = {
  post: (req, res) => {
    // todo: 이거 아님
    // 요청이 날라오면 해당 Email을 users에서 검색을해서
    // 근데 이메일이 어디있지? COOKIES?, BODY?
    // 함수로 만들어놓은 isAuthorized을 이용해서 토큰해석해서 데이터사용
    //TODO: 로직정리 -> 요청이 날라오면 토큰 삭제한다. -> res.cleraCookie
    try {
      res.clearCookie("authorization");
      res.status(200).send("Logged out successfully");
    } catch (err) {
      console.log(err);
    }
  },
};
