import './App.css';

import { useEffect, useState } from 'react';
var firstClick = true;
var chckdSqr = 0;
var dark = true;
var sound = true;
var x;
var y;
var numMinesArnd = [];
const sqr = [];
const line = [];
const msg = document.createElement("p");



function App() {
  // this maes the leaderboard update automatically when it gets a new score.
  const [data, setData] = useState(false);
  const [scores, setScores] = useState([]);
  let [scoreToSubmit, setScoreToSubmit] = useState(0);
  // bad but w/e. program was designed this way.
  const [stateDifficulty, setStateDifficulty] = useState(0);

  scores.sort(
    function(x, y) {
      if (x.score === y.score) {
        return x.time > y.time ? 1 : -1;
      }
      else {
        return x.score < y.score ? 1 : -1
      }
    }
  )
  const scoreBoardMap = scores.map(s => <tr> <td>{s.name}</td> <td>{s.score}</td> <td>{s.time}</td> </tr>);
  
  // hooks for scoreboard go here. 
  useEffect(() => {

    if (data === false) {
      fetch("http://localhost:3001/api")
        // we basically take request, jsonify it, update state to true, update score state with
        .then(res => res.json())
        .then(
          (result) => {
            // setData(true);
            setScores(result);
          },
          (error) => {
            // setData(true);
            console.log('error');
          }
        )
    }
    // API for our express server, located in the node folder.

  }, [data, scores])
  const changeInputScoreValue = (event) => {
    setScoreToSubmit(event.target.value);
  }
  // All timer stuff goes here 
  let [time, setTime] = useState(0);
  // const [timeToSubmit, setTimeToSubmit] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {

          setTime((t) => t + 1);

    }, 1000);
    return () => clearInterval(tick);
  }, []);



  function submitScore(score) {
    setData(false);
    if (scoreToSubmit === 0) {
      scoreToSubmit = "AAA";
    }
    let json_body = JSON.stringify(
      { name: scoreToSubmit, score: stateDifficulty, time: time})
    const scoreJSON = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: json_body
    }
    fetch("http://localhost:3001/submit", scoreJSON)
      .then(response => response.json());

    document.getElementById("highScoreForm").style.visibility = "hidden";
    setData(false);
  }

  return (
    <div className="app" id="app">
      <header id="header">
        <audio type='mp3' id='playSound1'src='./boop_final1.mp3'></audio>
        <audio type='mp3' id='playSound2'src='./Boop_final2.mp3'></audio>
        <audio type='mp3' id='playSound3'src='./Boop_final3.mp3'></audio>
        <audio type='mp3' id='playSoundLose'src='./losser.mp3'></audio>
        <audio type='mp3' id='playSoundWin'src='./victory1.mp3'></audio>


        <div className="pageTitle">
          <h1>Minesweeper-1012</h1>
        </div>
        <div className="settings">
          <button onClick={function () { newGame() }}>Restart</button>
          <button id="darkBtn" onClick={function () { toggleLight() }}>Dark Mode</button>
          <button id="soundBtn" onClick={function () { toggleSound() }}>Sound Effects ON</button>
        </div>

        <div className="leaderboard" id="leaderboard">
          <p></p>
          <h5>High Scores:</h5>
          <table className='leaderboardTable' id='leaderboardtable'><tr>
            <td>Name | </td>
            <td>Score | </td>
            <td>Time</td>
          </tr>
            {scoreBoardMap}</table>
        </div>

      </header>

      <main>
        <div className="gameOptions" id="gameOptions">
          <div className="presetOptions">
            <button className="easy" id="easy" onClick={function () { createGrid(0) }}>Easy(9x9, 10 Mines)</button>
            <button className="medium" id="medium" onClick={function () { createGrid(1) }}>Medium(16x16, 40 Mines)</button>
            <button className="hard" id="hard" onClick={function () { createGrid(2) }}>Hard(32x16, 99 Mines)</button>
            <div className="customOption">
              <button className="customize" id="customize" onClick={function () { createGrid(3) }}>Custom:</button>

              Length:
              <input type="number" id="length"></input>
              Height:
              <input type="number" id="height"></input>
              Mines:
              <input type="number" id="Mines"></input>
            </div>

          </div>

        </div>


        <div className="mineMap" id="mineMap">
          {/* Gonna put the timer here */}
          <div className='timer' id='timer'>Time Elapsed: {time}</div>


          <button id='playButton' className='playButton' onClick={function () { playGame() }}>PLAY</button>

          {/* make this button look really nice, we have such a limited UI as it is tbh. */}

          {/* Everything HTML related to scoreboards goes here : */}
          <div className='highScoreForm' id='highScoreForm'>

            <p>Victory! Enter Your Name for the Leaderboards:</p>
            <label>Name: </label><input type="text" id="scoreSubmission" name="scoreSubmission" onChange={changeInputScoreValue}></input><button onClick={submitScore}>Submit</button>
          </div>

        </div>
      </main>
    </div>
  );

  function createGrid(difficulty) {
    var mines;
    setTime(0);
    if (difficulty === 0) {
      document.getElementById("gameOptions").style.visibility = "hidden";
      document.getElementById("playButton").style.visibility = "hidden";
  
      x = 9;
      y = 9;
      mines = 10;
    } else if (difficulty === 1) {
      document.getElementById("gameOptions").style.visibility = "hidden";
      document.getElementById("playButton").style.visibility = "hidden";
  
      x = 16;
      y = 16;
      mines = 40;
    } else if (difficulty === 2) {
      document.getElementById("gameOptions").style.visibility = "hidden";
      document.getElementById("playButton").style.visibility = "hidden";
  
      x = 32;
      y = 16;
      mines = 99;
    } else {
      x = parseInt(document.getElementById("length").value);
      y = parseInt(document.getElementById("height").value);
      document.getElementById("gameOptions").style.visibility = "hidden";
      document.getElementById("playButton").style.visibility = "hidden";    
      mines = parseInt(document.getElementById("Mines").value);
      
      if (x < 2 || x > 45 || y < 2 || y > 100 || isNaN(y) || isNaN(x) || isNaN(mines) || mines > y * x) {
        console.log(x);
        console.log(y);
        console.log(mines);
        alert("Please enter a valid input!")
        x = 0;
        y = 0;
        document.getElementById("playButton").style.visibility = "visible";    

      }

    }
    // makes more sense because it works with custom tbh.
    setStateDifficulty(Math.floor((mines / (x * y)) * (x * y - mines) * 100));
    document.getElementById("easy").disabled = true;
    document.getElementById("medium").disabled = true;
    document.getElementById("hard").disabled = true;
    document.getElementById("customize").disabled = true;
    const map = document.getElementById("mineMap");
    for (let i = 0; i < x * y; i++) {
      if (i % x === 0) {
        line[i] = document.createElement("br");
        map.appendChild(line[i]);
      }
      sqr[i] = document.createElement("button");
      if (difficulty === 2 || x > 29) {
        sqr[i].className = 'smallSquare';
      }
      sqr[i].buttonEnabled = true;
      sqr[i].addEventListener("click", function () { if (this.buttonEnabled === true) { revealSqr(i, mines) } });
      sqr[i].addEventListener('contextmenu', (e) => {
        e.preventDefault();
        console.log("I think u right clicked");
        if (sqr[i].buttonEnabled === true) {
          sqr[i].buttonEnabled = false;
          sqr[i].style.background = "red";
        }
        else if (sqr[i].buttonEnabled === false) {
          sqr[i].buttonEnabled = true;
          sqr[i].style.background = "#f0f0f0";
        }


      });
      map.appendChild(sqr[i]);
    }
  }

  function revealSqr(SqrPos, mines) {
    if (firstClick) {
      firstClick = false;
      setTime(0);
      document.getElementById("timer").setAttribute.visibility = "visible";
      createMines(mines, SqrPos);
    }
    let soundNum = Math.floor(Math.random() * (3 - 1 + 1) + 1)
    if (sound = true) {
      document.getElementById("playSound" + soundNum).play();

    }
    sqr[SqrPos].disabled = true;
    sqr[SqrPos].style.backgroundColor = "rgb(200, 200, 225)";
    if (numMinesArnd[SqrPos] >= 10) {
      sqr[SqrPos].innerHTML = "BOOM";
      endGame(false);
    } else {
      sqr[SqrPos].innerHTML = numMinesArnd[SqrPos];
      if (numMinesArnd[SqrPos] === 0) {
        wipeZeroes(SqrPos, mines);
      }
      chckdSqr++;
      if (chckdSqr === x * y - mines) {
        endGame(true);
      }
    }
  }

  function createMines(mines, SqrPos) {
    document.getElementById("timer").style.visibility = "visible";

    for (let i = 0; i < x * y; i++) {
      numMinesArnd[i] = 0;
    }
    for (let i = 0; i < mines; i++) {
      var position = Math.floor(Math.random() * x * y + 1);
      if (numMinesArnd[position] !== 10 && position !== SqrPos) {
        numMinesArnd[position] = 10;
      } else {
        i--;
      }

    }
    for (let i = 0; i < x * y; i++) {
      if (i % x !== 0) {
        if (numMinesArnd[i - 1] >= 10) {
          numMinesArnd[i]++;
        }
      }
      if (i % x !== x - 1) {
        if (numMinesArnd[i + 1] >= 10) {
          numMinesArnd[i]++;
        }
      }
      if (i >= x) {
        if (numMinesArnd[i - x] >= 10) {
          numMinesArnd[i]++;
        }
      }
      if (i < x * (y - 1)) {
        if (numMinesArnd[i + x] >= 10) {
          numMinesArnd[i]++;
        }
      }

      if (i % x !== 0 && i >= x) {
        if (numMinesArnd[i - x - 1] >= 10) {
          numMinesArnd[i]++;
        }
      }
      if (i % x !== 0 && i < x * (y - 1)) {
        if (numMinesArnd[i + x - 1] >= 10) {
          numMinesArnd[i]++;
        }
      }
      if (i % x !== x - 1 && i >= x) {
        if (numMinesArnd[i - x + 1] >= 10) {
          numMinesArnd[i]++;
        }
      }
      if (i % x !== x - 1 && i < x * (y - 1)) {
        if (numMinesArnd[i + x + 1] >= 10) {
          numMinesArnd[i]++;
        }
      }
    }
  }

  function wipeZeroes(SqrPos, mines) {
    if (SqrPos >= x && sqr[SqrPos - x].innerHTML === "") {
      revealSqr(SqrPos - x, mines);
    }
    if (SqrPos < x * (y - 1) && sqr[SqrPos + x].innerHTML === "") {
      revealSqr(SqrPos + x, mines);
    }
    if (SqrPos % x !== 0 && sqr[SqrPos - 1].innerHTML === "") {
      revealSqr(SqrPos - 1, mines);
    }
    if (SqrPos % x !== x - 1 && sqr[SqrPos + 1].innerHTML === "") {
      revealSqr(SqrPos + 1, mines);
    }

    if (SqrPos % x !== 0 && SqrPos >= x && sqr[SqrPos - x - 1].innerHTML === "") {
      revealSqr(SqrPos - x - 1, mines);
    }
    if (SqrPos % x !== 0 && SqrPos < x * (y - 1) && sqr[SqrPos + x - 1].innerHTML === "") {
      revealSqr(SqrPos + x - 1, mines);
    }
    if (SqrPos % x !== x - 1 && SqrPos >= x && sqr[SqrPos - x + 1].innerHTML === "") {
      revealSqr(SqrPos - x + 1, mines);
    }
    if (SqrPos % x !== x - 1 && SqrPos < x * (y - 1) && sqr[SqrPos + x + 1].innerHTML === "") {
      revealSqr(SqrPos + x + 1, mines);
    }

  }
  function newGame() {
    document.getElementById("timer").style.visibility = "hidden";
    document.getElementById("mineMap").style.background = "rgb(30, 100, 150)";
    document.getElementById("playButton").style.visibility = "visible";
    document.getElementById("gameOptions").style.visibility = "hidden";
    const map = document.getElementById("mineMap");
    chckdSqr = 0;
    msg.innerHTML = "";
    for (let i = 0; i < x * y; i++) {
      if (i % x === 0) {
        map.removeChild(line[i]);
      }
      map.removeChild(sqr[i]);
    }
    document.getElementById("easy").disabled = false;
    document.getElementById("medium").disabled = false;
    document.getElementById("hard").disabled = false;
    document.getElementById("customize").disabled = false;
    document.getElementById("highScoreForm").style.visibility = "hidden";
    firstClick = true;
  }

  function playGame() {


    document.getElementById("easy").disabled = false;
    document.getElementById("medium").disabled = false;
    document.getElementById("hard").disabled = false;
    document.getElementById("customize").disabled = false;
    document.getElementById("highScoreForm").style.visibility = "hidden";
 
    document.getElementById("gameOptions").style.visibility = "visible";
    document.getElementById("playButton").style.visibility = "hidden";
  }

  function toggleLight() {
    if (dark) {
      dark = false;
      document.getElementById("darkBtn").innerHTML = "Light Mode";
      document.getElementById("header").style.backgroundColor = "rgb(215, 215, 255)";
      document.getElementById("leaderboard").style.backgroundColor = "rgb(230, 210, 220)";
      document.getElementById("gameOptions").style.backgroundColor = "rgb(90, 150, 200)";
      document.getElementById("mineMap").style.backgroundColor = "rgb(115, 175, 220)";
      document.getElementById("app").style.backgroundColor = "rgb(115, 175, 220)";
    } else {
      document.getElementById("header").style.backgroundColor = "rgb(130, 125, 150)";
      document.getElementById("leaderboard").style.backgroundColor = "rgb(200, 170, 180)";
      document.getElementById("gameOptions").style.backgroundColor = "rgb(30, 75, 120)";
      document.getElementById("mineMap").style.backgroundColor = "rgb(30, 100, 150)";
      document.getElementById("app").style.backgroundColor = "rgb(30, 100, 150)";
      document.getElementById("darkBtn").innerHTML = "Dark Mode";
      dark = true;
    }
  }
  function toggleSound() {
    if (sound) {
      sound = false;
      document.getElementById("soundBtn").innerHTML = "Sound Effects OFF";
      document.getElementById("playSound1").muted = true;
      document.getElementById("playSound2").muted = true;
      document.getElementById("playSound3").muted = true;
      document.getElementById("playSoundLose").muted = true;
      document.getElementById("playSoundWin").muted = true;


    } else {
      document.getElementById("soundBtn").innerHTML = "Sound Effects ON";
      sound = true;
    }
  }
  function endGame(win) {
    document.getElementById("timer").style.visibility = "hidden";

    for (let i = 0; i < x * y; i++) {
      sqr[i].disabled = true;
    }
    if (win) {
      // setTimeToSubmit(time);
        document.getElementById("playSoundWin").play();

      
      msg.innerHTML = "You Won! Your time is : " + time;
      console.log('You won! Your time is :' + time);

      document.getElementById("mineMap").insertBefore(msg, sqr[0]);

      document.getElementById("highScoreForm").style.visibility = "visible";

    } else {
      
      msg.innerHTML = "You Lost";
        document.getElementById("playSoundLose").play();

      

      document.getElementById("mineMap").insertBefore(msg, sqr[0]);
      document.getElementById("mineMap").style.background = "red";

    }
    // we are going to show the HIGHSCORE thing here.
  }
}

export default App;
