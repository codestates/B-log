const { User } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../serverFunctions");
module.exports = {
  post: (req, res) => {
    console.log("req :", req.body);
    const { email, username, password } = req.body;
    // todo: 안에 입력값이 하나도 없으면 출력되는 에러메세지가 필요할꺼 같은데?
    // todo: 먄악에 여길 쓸거라면 gitbook에 추가하기
    if (!email || !password || !username) {
      return res.status(401).send({ message: "Invalid input" });
    }
    User.findOrCreate({
      where: { email },
      defaults: { password, username },
    })
      .then(([data, created]) => {
        if (!created) {
          // TODO : 새로 생성이 되는게 아니라면 그건 이메일이 중복됬다는 이야기?
          // TODO : null 값으로 놓으니까 postman에 출력이 안된다.
          return res.status(401).send({ message: "exist email" });
        }
        // TODO : 그럼 여기는 새로 생성되는 부분, 패스워드 제거하고 accesstoken 만들어서 던진다.
        delete req.body.password;
        const accessToken = generateAccessToken(req.body);
        sendAccessToken(res, accessToken);
        res.status(201).send({ message: "ok" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "err" });
      });
  },
};
