const express = require("express");                                 // nom in express bycrypt.js 
const userModel = require("./models/user.model");
const bcrypt = require('bcryptjs');
const { error } = require("console");

const app = express();
require('./config/db');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.send("hello");
})


app.post('/create', async function (req, res) {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({
        email
    })
    if (user) {
        return res.json({ message: "user exist" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({
        name,
        email,
        password: hashedPassword
    })
    res.json({ message: "created successFully!", createdUser });

})


app.delete('/delete', async function (req, res) {
    const { email } = req.body;
    const user = await userModel.findOne({
        email
    })
    if (user) {
        await userModel.deleteOne({ email });
        return res.json("user deleted");
    }
    else {
        res.json({ message: "user not exist", error });
    }
})









app.listen(3000, function () {
    console.log('running');
})