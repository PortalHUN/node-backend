const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../utilities/db');

router.route('/auth')
.get((req,res)=>{
    res.json({code:200, message:`Use ${req.path}/register to register a user, or ${req.path}/login to authenticate one.`});
})

router.route('/auth/register')
.get((req,res)=>{
    res.json({code:200, message:`Usage: Body: {Username: String, Email: String, Password: String}`});
})
.post( async (req,res)=>{
    const {Username, Email, Password} = req.body;
    if(!Username || !Email || !Password) return res.json({code:500, message:"Missing Username, Email or Password."})
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(Password, salt);
    console.log(hashed);
    await db.query(`
    INSERT INTO users (Username, Email, Password) VALUES (${db.escape(Username)}, ${db.escape(Email)}, ${db.escape(hashed)});
    `, (err,result)=>{
        if(err) return res.json({code:500, message:"Password or Email are not unique."})
        return res.json({code:200, message:"OK"});
    });
});

router.route('/auth/login')
.get((req,res)=>{
    res.json({code:200, message:"Usage: Body: {Username: String, Password: String}"});
})
.post(async (req,res)=>{
    const {Username, Password} = req.body;
    if(!Username || !Password) return res.json({code:500, message: "Missing Username or Password."})
    await db.query(`SELECT u.Username, u.Password FROM users AS u WHERE u.Username = ${db.escape(Username)};`,async (err, result)=>{
        if(err) return res.json({code:500, message:"Internal Server Error."});
        if(!result[0]) return res.json({code:500,message:"Wrong username or password."});
        const validPassword = await bcrypt.compare(Password, result[0].Password);
        if(!validPassword) return res.json({code:500, message:"Wrong username or password."})
        return res.json({code:200, message:"Successful login."});
    });
})

module.exports = router;
