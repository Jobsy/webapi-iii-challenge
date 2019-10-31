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

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;