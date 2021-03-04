const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { registerValidation, loginValidation} = require('../validation');

router.post('/register', async(req, res) => {
    
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Check user
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Emailul exista deja!');

    let createdRole = "BASIC";
    const isAdmin = await Admin.findOne({email: req.body.email});
    if(isAdmin) createdRole = "ADMIN";
    //Hask Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    //Create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        role: createdRole
    });
    try{
        const savedUser = await user.save();
        res.status(200).send("Trimis!");
    }catch(err){
        res.status(400).send(err);
    }
})

//Login
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Check user
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send();
    //check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send();


    //Create and asign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: 3600});
    res.status(200).send({token: token});
})
module.exports = router; 
