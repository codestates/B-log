const { isAuthorized } = require("../serverFunctions");

module.exports = {
  get: (req, res) => {
    try {
      const userinfo = isAuthorized(req);
      if (!userinfo) {
        return res.status(401).send({ message: "invalid access token" });
      } else {
        delete userinfo.iat;
        delete userinfo.exp;
        res.send(userinfo);
      }
    } catch {
      res.status(500).send();
    }
  },
};
