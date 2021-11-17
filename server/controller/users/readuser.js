const { token } = require("../serverFunctions");

module.exports = {
  get: (req, res) => {
    try {
      const userinfo = token.isAuthorized(req);
      delete userinfo.iat;
      delete userinfo.exp;
      res.send(userinfo);
    } catch {
      res.status(500).send();
    }
  },
};
