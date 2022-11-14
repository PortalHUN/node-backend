const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../utilities/db");
const jwt = require("jsonwebtoken");

//https://github.com/gitdagray/mern_stack_course/blob/main/lesson_08-backend/controllers/authController.js

router.route("/auth").get((req, res) => {
  res.json({
    code: 200,
    message: `Use ${req.path}/register to register a user, or ${req.path}/login to authenticate one.`,
  });
});

router
  .route("/auth/register")
  .get((req, res) => {
    res.json({
      code: 200,
      message: `Usage: Body: {Username: String, Email: String, Password: String}`,
    });
  })
  .post(async (req, res) => {
    const { Username, Email, Password } = req.body;
    if (!Username || !Email || !Password)
      return res.json({
        code: 500,
        message: "Missing Username, Email or Password.",
      });
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(Password, salt);
    console.log(hashed);
    await db.query(
      `
    INSERT INTO users (Username, Email, Password) VALUES (${db.escape(
      Username
    )}, ${db.escape(Email)}, ${db.escape(hashed)});
    `,
      (err, result) => {
        if (err)
          return res.json({
            code: 500,
            message: "Password or Email are not unique.",
          });
        return res.json({ code: 200, message: "OK" });
      }
    );
  });

router
  .route("/auth/login")
  .get((req, res) => {
    res.json({
      code: 200,
      message: "Usage: Body: {Username: String, Password: String}",
    });
  })
  .post(async (req, res) => {
    const { Username, Password } = req.body;
    if (!Username || !Password)
      return res.json({ code: 500, message: "Missing Username or Password." });

    //Get user if Username and Active
    //Get user roles
    //Match Password
    //Create Access token {"UserInfo":{"username": username, "roles": [roles]}} {expiresIn:'15m'}
    //Create Refresh token {"username":username} {expiresIn:'1d'}
    //Create Refresh token cookie {httponly:true, sameSite:None, maxAge:1*24*60*60*1000}
    //res.json({accessToken})
  });

// /auth/refresh
// check jwt cookie
// verify jwt
// search for user
// create new Access token
// res.json({accessToken})

module.exports = router;
