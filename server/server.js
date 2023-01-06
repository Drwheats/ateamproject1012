const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const fs = require("fs");

// For some reason when we do ./highscores.json it makes a temporary file and doesnt save to the main json file. IDK. Will do good absolute path when we run it in prod.
// const pathToJSON = '/Users/saraabdul/Documents/comp1012/finalcopy2/src/node/server/highscores.json';
const pathToJSON = './highscores.json'
const app = express();
const highScores = require(pathToJSON);

let lastPostNumber = 0;
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
lastPostNumber = highScores[highScores.length - 1].postNumber + 1;

// receive the highscores from the server
app.get("/api", (req, res) => {

    res.json(highScores);
  });

// request the main page of topics from the server
app.get("/postNumber/", (req, res) => {
  // const highScores = require(pathToJSON);

  res.json(highScores);
});

// request a page of posts, including replies, from the server
app.post('/pageInfo', function (req, res) {
  // const highScores = require(pathToJSON);
  let checkPost = req.body;
  checkPost = checkPost.pageLoc;
  checkPost = Number(checkPost);
  for (var i = 0; i < highScores.length; i++) {
    if (highScores[i].postNumber === checkPost) {
      console.log("success")
      res.json(highScores[i]);
    }
  }
})
// Takes the reply from the server, checks list of posts, adds the reply to the post with correct pageloc. authentication will b required here.
app.post('/submitReply', function (req, res) {
  let checkPost = req.body;
  console.log(checkPost)
  for (var i = 0; i < highScores.length; i++) {
    if (highScores[i].postNumber === Number(req.body.pageLoc)) {
      checkPost.postNumber = lastPostNumber;
      lastPostNumber += 1;
      highScores[i].postReplies.push(checkPost);
      console.log("success")
      console.log(highScores[i].postReplies)
      res.json(highScores[i].postReplies);
    }
  }
  fs.writeFile(pathToJSON, JSON.stringify(highScores), err => {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Post has been logged.')
    }
  })
})

// submit a post topic to the server
app.post('/submit', function (req, res) {
  let newScore = req.body;

  lastPostNumber += 1;

  console.log(lastPostNumber);
  newScore["postNumber"] = lastPostNumber;
  newScore["postReplies"] = [];
  highScores.push(newScore);
  console.log(newScore);

  fs.writeFile(pathToJSON, JSON.stringify(highScores), err => {
    if (err) {
        console.log('Error', err)
    } else {
        console.log('Post has been logged.')
    }
})

})
// runs the express server

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
