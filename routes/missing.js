const router = require("express").Router();

router
  .route("*")
  .get((req, res) => {
    res.json({ code: "404", message: `Missing route` });
  })
  .post((req, res) => {
    res.json({ code: "404", message: `Missing route` });
  })
  .delete((req, res) => {
    res.json({ code: "404", message: `Missing route` });
  })
  .put((req, res) => {
    res.json({ code: "404", message: `Missing route` });
  });

module.exports = router;
