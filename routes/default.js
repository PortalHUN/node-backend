const router = require("express").Router();
const db = require("../utilities/db");

router.route("/").get((req, res) => {
  res.json({ code: "200", message: `Portal's services backend` });
});

module.exports = router;
