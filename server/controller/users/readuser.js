const { User } = require("../../models");
const {
  isAuthorized,
  generateAccessToken,
  sendAccessToken,
} = require("../serverFunctions");

module.exports = {
  get: (req, res) => {
    // TODO: 토큰이 유효하지 않은 토큰이거나
    console.log("토큰토큰토큰토큰", isAuthorized(req));
    if (!isAuthorized(req)) {
      return res.status(401).send({ message: "User who does not exist" });
    }
    const { id, username, email, createdAt, updatedAt } = isAuthorized(req);
    // TODO: 유저정보가 없는경우
    if (!id || !username || !email || !createdAt || !updatedAt) {
      return res.status(401).send({ message: "User who does not exist" });
    }
    try {
      return res.json({
        id: id,
        username: username,
        email: email,
        createdAt: createdAt,
        updatedAt: updatedAt,
      });
    } catch {
      return res.status(500).send("Server err");
    }
  },
};
