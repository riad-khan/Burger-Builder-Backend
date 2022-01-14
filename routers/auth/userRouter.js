const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth = require('../../middlewares/authCheck/auth');
const { User } = require('../../models/user');


const userSignUp = async (req, res) => {
    if (req.body.password < 6) return res.send('Password Should be 6 digits long');

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("user already exists");
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    try {
        const result = await user.save();
        const token = await user.generateJWT();
        res.send(token);
    } catch (error) {
        res.send(error.message)
    }
}

const userLogin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("email not found in server");

    const userValidate = await bcrypt.compare(req.body.password, user.password);
    if (!userValidate) return res.status(400).send("invalid Password")
    const token = user.generateJWT();
    res.send(token)
}



Router.route('/sign-up')
    .post(userSignUp)

Router.route('/sign-in')
    .post(userLogin)

Router.route('/me')
    .get(auth,(req,res)=>{
        res.send(req.user);
    })

module.exports = Router;