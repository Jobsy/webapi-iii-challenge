const express = require('express');

const dB = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const user = req.body;
    // const { name } = req.body;
    // const { name } = req.user;
    const { url } = req;
    // if (!name) {
    //     res.status(400).json({ errorMessage: "Please provide name for the user." })
    // }
    // dB.insert(user)
    //     .then(() => {
            res.status(201).json({ postedContent: user, url: url, operation: "POST" })
        // })
        // .catch((err) => {
        //     res.status(500).json({ error: "There was an error while saving the user to the database" + err })
        // })
});

router.post('/:id/posts', validateUserId, (req, res) => {
    // const user = req.body;
    // const { text } = req.body;
    // const { url } = req;
    // // const { id } = req.params;
    // const { id } = req.users;

    if (!text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    postDb.insert({ text, user_id: id })
        .then((aaaa) => {
            console.log(aaaa)
            // if (usersID > 0) {
            res.status(201).json({ postedContent: user, url: url, operation: "POST" })
            // }
            // res.status(404).json({ message: "The user with the specified ID does not exist." })
        })
        .catch((err) => {
            res.status(500).json({ error: "There was an error while saving the comment to the database: " + err })
        })

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

router.get('/:id', validateUserId, (req, res) => {
    // const { id } = req.params;

    // dB.getById(id)
    //     .then((users) => {

    //         if (users.length === 0) {
    //             res.status(404).json({ message: "The user with the specified ID does not exist." })
    //         }
    res.status(200).json({ users: req.users })
    // })
    // .catch(() => {
    //     res.status(500).json({ error: "The user information could not be retrieved." })
    // })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    // const { id } = req.params;

    // dB.getUserPosts(id)
    //     .then((posts) => {

    //         if (posts.length === 0) {
    //             res.status(404).json({ message: "The post with the specified ID does not exist." })
    //         }
    res.status(200).json({ posts: req.users })
    // })
    // .catch(() => {
    //     res.status(500).json({ error: "The post information could not be retrieved." })
    // })
});

router.delete('/:id', validateUserId, (req, res) => {

    const { id } = req.users;

    dB.remove(id)
        .then(() => {
            // if (rmPost === 0) {
            //     res.status(404).json({ message: "The post with the specified ID does not exist." })
            // }
            res.status(200).json({ removedPost: `post with id: ${id} deleted` })
        })
    // .catch(() => {
    //     res.status(500).json({ error: "The post could not be removed" })
    // })
});

router.put('/:id', validateUserId, (req, res) => {
    const user = req.body;
    const { name } = req.body;
    const { url } = req;
    // const { id } = req.params;
    const { id } = req.users;

    if (!name) {
        res.status(400).json({ errorMessage: "Please provide name for the user." })
    }
    dB.update(id, user)
    // .then((usersID) => {
    //   if (usersID) {
    res.status(200).json({ updatedUser: user, url: url, operation: "POST" })
    // }
    // res.status(404).json({ message: "The user with the specified ID does not exist." })
    // })
    // .catch(() => {
    //     res.status(500).json({ error: "The user information could not be modified." })
    // })
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;

    dB.getById(id)
        .then((users) => {
            console.log("???: ", users)
            // if (users.length === 0) {
            //     res.status(404).json({ message: "The user with the specified ID does not exist." })
            // }
            // req.users = users;
            // next();

            if (users) {
                req.users = users;
                console.log("im innnnnnnn")
                next();
            }
            else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch((err) => {
            res.status(500).json({ error: "The user information could not be retrieved." + err })
        })
}

function validateUser(req, res, next) {
    
    if (Object.keys(req.body).length) {
        req.user = req.body;
        dB.insert(req.body)
        .then(() => {
        next()
        })
        .catch((err) => {
            res.status(400).json({ errorMessage: "Please provide name for the user." + err})
            
        })
    }
    else {
        dB.insert(req.body).catch((err) => {
            res.status(500).json({ error: "There was an error while saving the user to the database"  + err})
        })
    }
}

function validatePost(req, res, next) {

}

module.exports = router;
