const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    
    const token = req.body.token;
    if(!token) return res.status(401).send("Not logged in!");

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if(verified)
            res.status(200).send("Currently logged in");
    }catch(err){
        res.status(400).send("Verification has failed!");
    }
})
module.exports = router;