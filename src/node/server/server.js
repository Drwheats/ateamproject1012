const express = require("express");
const fs = require("fs");
const highScores = require('./highscores.json');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({ credentials: true }));
// receive the highscores from the server
app.get("/api", (req, res) => {
    res.json(highScores);
  });

// send highscores to the server will be below



// runs the express server

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
