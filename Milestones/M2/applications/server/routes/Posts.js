const express = require('express');

const router = express.Router();
const { Posts } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware');



router.get("/", validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})

router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({ where: {UserId: id}});
    res.json(listOfPosts);
})

router.post("/byId/:id", validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
})

router.post('/byId/hide/:id', validateToken, async (req, res) => {
    const postID = req;
    console.log(`postID: ${postID}`)
    // Posts.update(
    //     {showPost: 0},
    //     {where: {id: postID}}
    // )
    // const postID = await Transactions.findAll({
    //     attributes: ['postID'],
    //     where: {id : transactionId}
    //     }
    // )
    // console.log(postID)
    res.json(postID)
})

router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
})

module.exports = router;