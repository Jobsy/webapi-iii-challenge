const express = require('express');

const dB = require("./userDb");

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    dB.get()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    dB.getById(id)
        .then((users) => {

            if (users.length === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
            res.status(200).json({ users: users })
        })
        .catch(() => {
            res.status(500).json({ error: "The user information could not be retrieved." })
        })
});

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;

    dB.getUserPosts(id)
        .then((posts) => {

            if (posts.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(200).json({ posts: posts })
        })
        .catch(() => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
});

router.delete('/:id', (req, res) => {
    
    const { id } = req.params;

    dB.remove(id)
        .then((rmPost) => {
            if (rmPost === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(200).json({ removedPost: `post with id: ${id} deleted` })
        })
        .catch(() => {
            res.status(500).json({ error: "The post could not be removed" })
        })
});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
