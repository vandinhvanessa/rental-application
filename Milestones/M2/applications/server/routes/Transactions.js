const express = require('express');

const router = express.Router();
const { Transactions } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware')

router.get('/:transactionId', async (req, res) => {
    const transactionId = req.params.transactionId;
    const transactions = await Transactions.findAll({where: {
        TransactionID: transactionId
    }});
    res.json(transactions);
})

// router.post("/", validateToken, async (req, res) => {
//     const comment = req.body;
//     const username = req.user.username;
//     comment.username =  username;
//     await Comments.create(comment);
//     res.json(comment);
// })

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