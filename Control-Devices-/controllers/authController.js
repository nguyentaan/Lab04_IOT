const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const router = require('../routes/deviceRoutes');
require('dotenv').config();

exports.register = async (req, res) => {
    const {username, password} = req.body;
    try {
        let user = await UserModel.findOne({username})
        if(user){
            return res.status(400).json({error: 'User already exists'});
        }
        user = new UserModel({
            username,
            password
        });
        await user.save();

        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: 3600},(err,token)=>{
            if(err) throw err;
            res.json({token});
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({error: 'Could not register user'});
    }
}

exports.login = async(req,res)=>{
    const {username,password} = req.body;
    try {
        let user = await UserModel.findOne({username});
        if(!user){
            return res.status(400).json({error: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(400).json({error: 'Invalid credentials'});
        }
        const payload = {user: {id: user.id}};
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: 3600},(err,token)=>{
            if(err) throw err;
            res.json({token});
        });
    } catch (error){
        console.error('Error logging in user:', error);
        res.status(500).json({error: 'Could not login user'});
    }
}

// module.exports = router;