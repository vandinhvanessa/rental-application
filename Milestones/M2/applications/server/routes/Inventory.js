const express = require('express');

const router = express.Router();
const { Inventory } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware');
const db = require('../models');
const { QueryTypes, Transaction } = require('sequelize');
const { Op } = require("sequelize");


// posting responds with inventoryListingID
router.post("/", validateToken, async (req, res) => {
    console.log("in inventory")
    const inventoryListing = {
        itemName: "",
        username: "",
        category: "",
        image: ""
    }
    // console.log(req)
    // console.log(req.body)
    inventoryListing.itemName = req.body.itemName
    inventoryListing.username = req.user.username
    inventoryListing.category = req.body.category
    inventoryListing.image = req.user.username
    // make sure item names are unique
    const newListingawait = Inventory.create(inventoryListing)

    // const obj = JSON.parse(transactionId)
    // inventoryListingID = inventoryListingID.map(({id}) => id)
    res.json(newListingawait);
})

module.exports = router;