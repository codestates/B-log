module.exports = {
  post: (req, res) => {
    try {
      res.clearCookie("authorization");
      res.status(200).send({ message: "Logged out successfully" }); //리턴하는 객체 형식 확인하고 수정
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
