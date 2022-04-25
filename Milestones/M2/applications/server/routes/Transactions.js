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
    const transaction = req.body;
    const username = req.user.username;
    console.log(req.body)
    transaction.renter =  username;
    await Transaction.create(transaction);
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