const { User } = require("../../models");

module.exports = {
  get: (req, res) => {
    //todo: 로직정리 ->  요청받은 req.parmas에는 사용자가 입력한 email이 존재하며
    //todo: 그 이메일은 알맞게 처리해서 User라는 db에 데이터와 비교하여 존재할경우 409에러, 아니면 200 message "ok"
    //todo: 요청받은 email에서 : 부분 빼고 만든 useremail
    const useremail = req.params.email.split(":")[1];
    console.log("이메일", useremail);
    User.findOne({ where: { email: useremail } })
      .then((data) => {
        if (data) {
          return res.status(409).send({ message: "email exist" });
        } else {
          return res.send({ message: "ok" });
        }
      })
      .catch((err) => {
        return res.status(500).send({ err, message: "Server err" });
      });
  },
};
