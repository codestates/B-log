const { token } = require("../controller/serverFunctions");

module.exports = (req, res, next) => {
  const user = token.isAuthorized(req);

  if (!user) {
    res.status(401).send({ message: "access token expired" });
  } else {
    next();
  }
};
