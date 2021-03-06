require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1h" });
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie("authorization", accessToken, {
      httpOnly: true,
      samesite: "none",
      secure: true,
      domain: process.env.CLIENT_DOMAIN,
    });
  },
  isAuthorized: (req) => {
    const authorization = req.cookies["authorization"];
    if (!authorization) {
      return null;
    }
    try {
      return verify(authorization, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};
