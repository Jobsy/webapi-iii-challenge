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

router.get('/:id', (req, res) => {
    const { id } = req.params;

    postDb.getById(id)
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

    postDb.remove(id)
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

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;