const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { Users } = require("../models");

const {sign} = require("jsonwebtoken");
const { validateToken } = require('../middlewares/AuthMiddleware');//token to check if login is valid
//gets the body from page, assigns to corresponding variables
//creates a User account and encrypts the password
router.post("/", async (req, res) => {
    const {username, password, email, address, city, state, zipCode, country} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            email: email,
            address: address,
            city: city,
            state: state,
            zipCode: zipCode,
            country: country,
        });
        res.json("SUCCESS");
    });
});
//gets body from page and set it to username and password
//searches User database if username exists
//if database password is correct with input, then set accessToken to be used
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({ where: {username: username} });
    if(!user) {
        res.json({error: "User does not exist."})
    }

    bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });
    
    const accessToken = sign({username: user.username, id: user.id}, "importantsecret")
    res.json({token: accessToken, username: username, id: user.id});
  });
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
})
//retrieves data from specified user id
router.get('/basicinfo/:id', async (req, res) => {
    const id = req.params.id;
    const basicInfo = await Users.findByPk(id, {
        attributes : {
            exclude: ["password"]
        }
    });
    res.json(basicInfo);
})

module.exports = router;