const express = require('express');

const router = express.Router();
const { Transactions } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware');
const db = require('../models');
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
// const { Transaction } = require('sequelize');

router.get('/:transactionId', async (req, res) => {
    const transactionId = req.params.transactionId;
    const transactions = await Transactions.findAll({where: {
        TransactionID: transactionId
    }});
    res.json(transactions);
})

router.put('/:transactionId', async (req, res) => {
    console.log("helo")
    Transactions.update(
        {active: req.body.active}
    )
    .then(async (rowsUpdate, [updatedTransactions]) => {
        res.json(updatedTransactions)
        
    })
})
// postID: "",
//         itemDescription: "",
//         lender: "",
//         renter: "",
//         transactionBegin: "",
//         transactionEnd: "",
//         active: "",
//         cost: ""
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
    transaction.cost = req.body.subTotal
    const duplicate = await Transactions.count({
        where: {
            postID: transaction.postID,
            renter: transaction.renter
        }
    }).then(async (count) => {
        if (count == 0){
            await Transactions.create(transaction);
        }
    })
    const transactionId = await Transactions.findAll({
        attributes: ['id'],
        where: {
            postID: transaction.postID
        }
    })
    // console.log(transactionId)
    res.json(transactionId);
})

// router.delete("/:commentId", validateToken, async (req, res) => {
//     const commentId = req.params.commentId

//     await Comments.destroy({
//         where: 
//             {
//                 id: commentId
//             }
//     });

//     res.json("DELETED SUCCESSFULLY")
// });

module.exports = router;