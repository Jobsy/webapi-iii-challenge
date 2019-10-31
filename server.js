const express = require("express");

const server = express();

const router = require("./users/userRouter");
const router2 = require("./posts/postRouter");
server.use(express.json());
server.use("/api/users", router);
server.use("/api/posts", router2);

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin' 
    )}`
  );

  next();
}

// function validateUserId(req, res, next) {
//   const { id } = req.params;

//   next();
// }

module.exports = server;
