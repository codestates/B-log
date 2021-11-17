module.exports = {
  post: (req, res) => {
    try {
      res.clearCookie("authorization", { domain: process.env.CLIENT_DOMAIN });
      res.status(200).send({ message: "Logged out successfully" });
    } catch (err) {
      res.status(500).send();
    }
  },
};
