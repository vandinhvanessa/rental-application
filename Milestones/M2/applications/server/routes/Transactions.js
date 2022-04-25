const express = require('express');

const router = express.Router();
const { Transactions } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware');
// const { Transaction } = require('sequelize/types');

router.get('/:transactionId', async (req, res) => {
    const transactionId = req.params.transactionId;
    const transactions = await Transactions.findAll({where: {
        TransactionID: transactionId
    }});
    res.json(transactions);
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
        active: "",
        cost: ""
    }
    transaction.postID = req.body.id
    transaction.itemDescription = req.body.postText
    transaction.lender = req.body.username
    transaction.renter = "placeholder"
    transaction.transactionBegin = req.body.startDate
    transaction.transactionEnd = req.body.endDate
    transaction.active = true
    transaction.cost = req.body.subTotal
    console.log(transaction)
    await Transactions.create(transaction);
    res.json(transaction);
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