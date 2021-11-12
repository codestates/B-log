const { User } = require("../../models");

module.exports = {
  get: (req, res) => {
    try {
      const useremail = req.params.email;

      User.findOne({ where: { email: useremail } })
        .then((data) => {
          if (data) {
            return res.status(409).send({ message: "email exist" });
          } else {
            return res.send({ email: useremail, message: "ok" });
          }
        })
        .catch((err) => {
          return res.status(500).send({ err, message: "Server err" });
        });
    } catch {
      return res.status(500).send({ err, message: "Server err" });
    }
  },
};
