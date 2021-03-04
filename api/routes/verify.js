const jwt = require("jsonwebtoken");
const Admin = require('../models/Admin');
const User = require("../models/User");

const authenticate = async (req, res, next) => {
    const token = req.header("auth-token");
    if(!token) return res.status(401).send("Access Denied!");

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        const isUser = await User.findOne({_id: req.user._id});
        isUser.role === "ADMIN" ? next() : res.status(400).send();
    }catch(err){
        res.status(400).send("Verificarea a esuat!");
    }
}

module.exports = authenticate;