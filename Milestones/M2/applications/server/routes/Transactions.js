const express = require('express');

const router = express.Router();
const { Transactions } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware');
const db = require('../models');
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
// const { Transaction } = require('sequelize');

router.get('/:transactionId', validateToken, async (req, res) => {
    const transactionId = req.params.transactionId;
    const transactions = await Transactions.findAll({where: {
        TransactionID: transactionId
    }});

    res.json(transactions);
})

router.post('/byId/:transactionId', validateToken, async (req, res) => {
    const transactionId = req.params.transactionId;
    // console.log(transactionId)
    Transactions.update(
        {active: 1},
        {where: {id: transactionId}}
    )
    const postID = await Transactions.findAll({
        attributes: ['postID'],
        where: {id : transactionId}
        }
    )
    // console.log(postID)
    res.json(postID)
})

router.post("/", validateToken, async (req, res) => {
    console.log("in post")
    const transaction = {
        postID: "",
        itemDescription: "",
        lender: "",
        renter: "",
        transactionBegin: "",
        transactionEnd: "",
        active: 0,
        cost: ""
    }
    // console.log(req)
    // console.log(req.body)
    
    transaction.postID = await req.body.id
    transaction.itemDescription = req.body.postText
    transaction.lender = req.body.username
    transaction.renter = req.user.username
    transaction.transactionBegin = req.body.startDate
    transaction.transactionEnd = req.body.endDate
    transaction.active = false
    transaction.cost = Number(req.body.subTotal) + Number(req.body.depositFee) + Number(req.body.shippingFee)
    const duplicate = await Transactions.count({
        where: {
            postID: transaction.postID,
            renter: transaction.renter
        }
    }).then(async (count) => {
        if (count == 0){
            await Transactions.create(transaction);
        }else{
            console.log("Transaction with this user already exists")
        }
    })
    let transactionID = await Transactions.findAll({
        attributes: ['id'],
        where: {
            postID: transaction.postID
        }
    })
    // const obj = JSON.parse(transactionId)
    transactionID = transactionID.map(({id}) => id)
    res.json(transactionID);
})


module.exports = router;