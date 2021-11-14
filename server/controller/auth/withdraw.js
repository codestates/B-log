const { User } = require("../../models");
const { isAuthorized } = require("../../controller/serverFunctions");

module.exports = {
  delete: async (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      return res.status(401).send({ message: "invalid access token" });
    } else {
      try {
        const user = await User.findOne({
          where: { id: userinfo.id, password: req.body.password },
        });
        if (!user) {
          res.status(403).send({ message: "wrong password" });
        } else {
          User.destroy({ where: { id: userinfo.id } })
            .then((data) => {
              if (data) {
                res.clearCookie("authorization");
                res.status(204).send();
              }
            })
            .catch((err) => {
              res.status(500).send();
            });
        }
      } catch (err) {
        res.status(500).send();
      }
    }
  },
};
