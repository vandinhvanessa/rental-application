const express = require('express');

const router = express.Router();
const { Posts } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware');


//retrieves list of posts 
router.get("/", validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});
//retrieves post data by its given id
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})
//retrieves lists of post by the given user id
router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({ where: {UserId: id}});
    res.json(listOfPosts);
})
//inserts into post table with given username and user id
//route to individual post
router.post("/byId/:id", validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
})
//sets flag to 0 so that the post can be hidden once transacation is complete
router.post('/byId/hide/:id', validateToken, async (req, res) => {
    const postID = req.params.id;
    
    console.log("---------postID is:", postID)
    Posts.update(
        {showPost: 0},
        {where: {id: postID}}
    )
    // const postID = await Transactions.findAll({
    //     attributes: ['postID'],
    //     where: {id : transactionId}
    //     }
    // )
    // console.log(postID)
    res.json(postID)
})
//inserts into post table with given username and user id
router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
})

module.exports = router;