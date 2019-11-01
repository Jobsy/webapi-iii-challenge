const express = require("express");

const postDb = require("./postDb");

const router = express.Router();

router.get('/', (req, res) => {
    postDb.get()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch(() => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
});

router.get('/:id', validatePostId, (req, res) => {
    // const { id } = req.params;
// console.log("LKLKKK: ", req.post)
    // postDb.getById(id)
    //     .then((posts) => {

    //         if (posts.length === 0) {
    //             res.status(404).json({ message: "The post with the specified ID does not exist." })
    //         }
    res.status(200).json({ posts: req.posts })
    // })
    // .catch(() => {
    //     res.status(500).json({ error: "The post information could not be retrieved." })
    // })
});

router.delete('/:id', validatePostId, (req, res) => {
    // const { id } = req.params;
    const { id } = req.posts;

    postDb.remove(id)
        .then((rmPost) => {
            // if (rmPost === 0) {
            //     res.status(404).json({ message: "The post with the specified ID does not exist." })
            // }
            res.status(200).json({ removedPost: `post with id: ${id} deleted` })
        })
        .catch(() => {
            res.status(500).json({ error: "The post could not be removed" })
        })
});

router.put('/:id', (req, res) => {
    const post = req.body;
    const { text } = req.body;
    const { url } = req;
    const { id } = req.params;

    if (!text) {
        res.status(400).json({ errorMessage: "Please provide text for the post." })
    }
    postDb.update(id, post)
        .then((usersID) => {
            if (usersID) {
                res.status(200).json({ updatedContent: post, url: url, operation: "PUT" })
            }
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch((err) => {
            res.status(500).json({ error: "The post information could not be modified." + err })
        })
});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params;

    postDb.getById(id)
        .then((posts) => {
            if (posts) {
                req.posts = posts;
                next();
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
}

module.exports = router;