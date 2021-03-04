const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv/config');

PORT = 3000;
app.listen(PORT);

//MiddleWare
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//Import Routes
const postRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const colRoute = require('./routes/collection');
const valRoute = require('./routes/refreshValidation')

//Route MiddleWares
app.use('/api/posts', postRoute);
app.use('/api/user', authRoute);
app.use('/api/collection', colRoute);
app.use('/api/validation', valRoute);

app.get('/', (req, res) =>{
    console.log("Get request succesfully");
    res.status(200).send("OK!");
})

//Connect to DB
/* mongoose.connect(process.env.PASS, { useNewUrlParser: true }, ()=>{
    console.log("Connected To DB!");
}) */
//Connect to DB
mongoose.connect(process.env.AUTH, { useNewUrlParser: true }, ()=>{
    console.log("Connected To USERDB!");
})
