const express = require('express');

const router = express.Router();
const { Transactions } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware');
const db = require('../models');
const { QueryTypes, Transaction } = require('sequelize');
const { Op } = require("sequelize");
// const { Transaction } = require('sequelize');



// router.get('/byId/:id', async (req, res) => {
//     const id = req.params.id;
//     const post = await Posts.findByPk(id);
//     res.json(post);
// })

// router.get('/byuserId/:id', async (req, res) => {
//     const id = req.params.id;
//     const listOfPosts = await Posts.findAll({ where: {UserId: id}});
//     res.json(listOfPosts);
// })

// axios.get(`http://${hostname}/transactions/byUser/${username}`)
//         .then((response) => {
//             setPurchaseHistory(response)
//         })

//retrieves list of transactions where the render is the user and payment has already been received
router.get('/byRenter/:username',  async (req, res) => {
    const username = req.params.username;
    console.log("username in GET:", username);
    const listOfTransactions = await Transactions.findAll({ 
        where: {
        renter: username,
        paymentReceived: true
        }
    });
    res.json(listOfTransactions);
})
//retrieves list of transactions where the lender is the user and payment has already been received
router.get('/byLender/:username',  async (req, res) => {
    const username = req.params.username;
    const listOfTransactions = await Transactions.findAll({ 
        where: {
        lender: username,
        paymentReceived: true
    }
});
    res.json(listOfTransactions);
})
//sets return flag to 1 at given transaction id and received payment in table 
router.post('/itemReturn/byID/:transactionId', validateToken, async (req, res) => {
    const transactionId = req.params.transactionId;
    console.log(transactionId)
    Transactions.update(
        {paymentReceived: 1,
        itemReturned: 1},
        {where: {id: transactionId}}
    )
    // Transactions.update(
    //     {itemReturned: 1},
    //     {where: {id: transactionId}}
    // )
    
    const postID = await Transactions.findAll({
        attributes: ['postID'],
        where: {id : transactionId}
        }
    )
    // console.log(postID)
    res.json(postID)
})
//completes a transaction by setting payment to received
//sets transaction for that given postID
router.post('/byId/:transactionId', validateToken, async (req, res) => {
    const transactionId = req.params.transactionId;
    // console.log(transactionId)
    Transactions.update(
        {paymentReceived: 1},
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
//creates an initial incomplete transaction, in cart page
//complete when checkout is processed
router.post("/", validateToken, async (req, res) => {
    console.log("in post")
    const transaction = {
        postID: "",
        itemDescription: "",
        lender: "",
        renter: "",
        transactionBegin: "",
        transactionEnd: "",
        paymentReceived: false,
        itemReturned: false,
        itemLeftRenter:false,
        cost: "",
        image: ""
    }
    // console.log(req)
    // console.log(req.body)
    //sets transaction columns to corresponding data
    transaction.postID = await req.body.id
    transaction.itemDescription = req.body.postText
    transaction.lender = req.body.username
    transaction.renter = req.user.username
    transaction.transactionBegin = req.body.startDate
    transaction.transactionEnd = req.body.endDate
    transaction.cost = Number(req.body.subTotal) + Number(req.body.depositFee) + Number(req.body.shippingFee)
    transaction.image = req.body.image
    await Transactions.create(transaction);
    // const duplicate = await Transactions.count({
    //     where: {
    //         postID: transaction.postID,
    //         renter: transaction.renter
    //     }
    // }).then(async (count) => {
    //     if (count == 0){
    //         await Transactions.create(transaction);
    //     }else{
    //         console.log("Transaction with this user already exists")
    //     }
    // }).catch(console.log("Error finding duplicates"))
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