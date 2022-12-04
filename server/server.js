const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const fs = require("fs");

// For some reason when we do ./highscores.json it makes a temporary file and doesnt save to the main json file. IDK. Will do good absolute path when we run it in prod.
// const pathToJSON = '/Users/saraabdul/Documents/comp1012/finalcopy2/src/node/server/highscores.json';
const pathToJSON = './highscores.json'
const app = express();



let scores = [];
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// receive the highscores from the server
app.get("/api", (req, res) => {
  const highScores = require(pathToJSON);

    res.json(highScores);
  });

// send highscores to the server will be below
app.post('/submit', function (req, res) {
  let newScore = req.body;
  console.log(newScore);
  let highScores = [];
  highScores = require(pathToJSON);
  highScores.push(newScore);

  fs.writeFile(pathToJSON, JSON.stringify(highScores), err => {
    if (err) {
        console.log('Error', err)
    } else {
        console.log('Score has been logged.')
    }
})
  console.log(highScores);

})
// runs the express server

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
