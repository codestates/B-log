const { User } = require("../../models");

module.exports = {
  get: (req, res) => {
    const email = req.params.email;
    if (email) {
      User.findOne({ where: { email } })
        .then((data) => {
          if (data) {
            res.status(409).send({ message: "email exist" });
          } else {
            res.send({ email: email, message: "ok" });
          }
        })
        .catch((err) => {
          res.status(500).send({ err, message: "Server error" });
        });
    } else {
      res.status(500).send();
    }
  },
};
