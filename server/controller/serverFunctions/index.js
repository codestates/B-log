require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1h" });
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie("authorization", accessToken, {
      httpOnly: true,
    });
  },
  isAuthorized: (req) => {
    const authorization = req.cookies["authorization"];
    if (!authorization) {
      return null;
    }
    const token = authorization.token;
    try {
      return verify(token, process.env.ACCESS_TOKEN);
    } catch (err) {
      return null;
    }
  },
};
