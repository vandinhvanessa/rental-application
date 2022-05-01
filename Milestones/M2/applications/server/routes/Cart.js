const express = require('express');

const router = express.Router();
const { Cart } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware')

// router.get('/:postId', async (req, res) => {
//     const postId = req.params.postId;
//     const comments = await Comments.findAll({where: {
//         PostId: postId
//     }});
//     res.json(comments);
// })

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
/*router.get("/", validateToken, async (req, res) => {
    //const cartID = req.params.cartID;
    const userID = req.user.id;
    console.log("------userID GET:", userID)
    //console.log("------cartid GET is: ", cartID);
    const cart = await Cart.findAll({where: {
        userID: userID
    }})
    res.json(cart);
})

router.post("/", validateToken, async (req, res) => {
    const cart = {
        userID: "",
        postID: "",
    };
    cart.userID = req.user.id;
    cart.postID = await req.body.id;
    
    console.log("--------postID POST is: ", cart.postID)
    console.log("--------userID POST is: ", cart.userID);
    
    await Cart.create(cart);
    res.json(cart)
})*/

module.exports = router;