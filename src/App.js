import './App.css';
import { useEffect, useState } from 'react';
import mineLogo from './media/minepumpkin.png';
import mineBad from './media/mine.png'
import mineGood from './media/defusedpump.png'
import mineBoom from './media/minepumpkinboom.png'
import { Router } from 'react-router';

function App() {
  const [grid, setGrid] = useState(0);
  const [mines, setMines] = useState(0);
  const [gameState, setGameState] = useState(false);

  function showFormIfInputGood() {
    document.getElementById("form3").style.visibility = "visible";
    document.getElementById("form4").style.visibility = "visible";
    document.getElementById("errormessage").style.visibility = "hidden";

  }
  function hideFormIfInputBad() {
    document.getElementById("form3").style.visibility = "hidden";
    document.getElementById("form4").style.visibility = "hidden";
    document.getElementById("errormessage").style.visibility = "visible";

    
  }

  function winGame() {

    document.getElementById("errormessage").innerHTML = "You have won the game! Congratulations, your score has been recorded."
  }

  function loseGame() {
    document.getElementById("errormessage").style.visibility = "visible";
    document.getElementById("errormessage").innerHTML = "You have lost the game! Congratulations, your score has not been recorded."

  }

  function clickRestart() {
    console.log('works so far');
    setGameState(true);
    setGrid(0);
    setMines(0);
    hideFormIfInputBad();
    document.getElementById("form1").style.visibility = "visible";
    document.getElementById("form2").style.visibility = "visible";
    document.getElementById("form3").style.visibility = "visible";

  }

  function clickSpawn() {
    setGameState(true);
    document.getElementById("form1").style.visibility = "hidden";
    document.getElementById("form2").style.visibility = "hidden";
    document.getElementById("form3").style.visibility = "hidden";
    console.log('hiding forms ...');
  } // This will be used to run the program, right now it is reacting for testing purposes.


  useEffect(() => {
    if (grid > 1 && grid < 70 && (grid * grid) > mines) {
      showFormIfInputGood();
    }
    else {
      hideFormIfInputBad();
    }

  })

  function GameGrid(props) {
    let gamePlaying = true;
      const row_length = props.gridnum;
      const num_grid = row_length * row_length;
      const mines = props.minenum;
      let gameGrid = [];
      const gameColumns = [];
      let c = 0;
      const mineArray = [];
      let score = 1;

      function dontHandleClick() {
        console.log(';)');
      }
      
      // Looks like most of the logic for the actual game is going to be in here, which is bad. But whatever.
      // My plan as of now : I am going to use this to update a 4th state variable. When number of spaces - mines is equal to zero, that means the player wins.
      const handleClick = (event, key) => {
        console.log('this is ' + event.target.className + ' number: ', key);
        if (event.target.className === "yesMine" && gamePlaying == true) {
          event.target.src = mineBoom;
          console.log('MINE');
          gamePlaying = false;
          loseGame();
        }
        if (event.target.className === "notMine" && gamePlaying === true && !(event.target.defused)) {
          event.target.defused = true;
          event.target.src = mineGood;
          console.log(event.target.defused);
          console.log(score);
          score = score +1;
          if (score > grid * grid - mines) {
            console.log('you win');
            gamePlaying = false;
            winGame();
          }
        }
        // I am going to put code here once mr. logic is done with his logic. This will search around the grid and get the minesweeper #.
        

      };
      
    
      // makes array of non-mine objects
      for (let i=0; i < num_grid; i++) {
        gameGrid.push(<img alt="mine?" onClick={e => handleClick(e, i)} defused={false} className="notMine" src={mineLogo}></img>)
      }
    
      // makes array of mine objects
      for (let i=0; i < mines; i++) {
        mineArray.push(<img alt="mine?" onClick={e => handleClick(e, i)} className="yesMine" src={mineBad}></img>)
      }
    
      // next 2 blocks get rid of x non-mine objects and add the whole mine array into the grid.
      for (let i = 0; i < mines; i++) {
        gameGrid.pop();
      }
    
      for (let i = 0; i < mines; i++) {
        gameGrid.push(mineArray[i]);
      }
      gameGrid = gameGrid.map(value => ({value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({value}) => value)
      // Randomizes the board.
    
      //takes from the mineGrid array of grid objects, makes them into rows, then makes X rows to make the whole board
      for (let j=0; j < row_length; j++) {
        let mineRows = [];
        for (let i=0; i < row_length; i++) {
          // If there is a time where I need to give every object in mineGrid a unique key, this is where I would do it by cloning the object.
          mineRows.push(gameGrid[c])
          c += 1;
        }
        gameColumns.push(mineRows)
        gameColumns.push(<br></br>)
      } // defines the good spaces on the grid
    
      // renders grid for gamegrid object
      return (gameColumns);
      }
    
  return (
    <div className="App">Mine Sweeping Simulator for COMP1012
      <header className="App-header">
          <p className='form1' id='form1'> 
          <label>Number of Boxes: </label>
          <input type="text" value={grid} onChange={e => setGrid(e.target.value)}></input> <label value={grid} >x{grid}</label>
          </p>
          <p className='form2' id='form2'>
          <label>Number of Mines: </label>
          <input type="text" value={mines} placeholder={Math.ceil((grid * grid) / 5)} onChange={e => setMines(e.target.value)}></input>
          </p>
          <p className='form3' id='form3'>
          <label>Spawn a <span className='beigeletters'>{grid}x{grid}</span> board with <span className='redletters'>{mines}</span> mines.</label>
          <br></br>
          <button className='spawnbutton' onClick={() => { clickSpawn()}}>Play</button>
          </p>
        <p className='form4' id='form4'>
        <GameGrid gridnum={grid} minenum={mines}/></p>
        <p className='errormessage' id='errormessage'>Invalid Settings; Please Try Again.</p>
        <button className='restartButton' id='restartButton' onClick={clickRestart} >Restart</button>
      </header>
    </div>
  );
}


export default App;
