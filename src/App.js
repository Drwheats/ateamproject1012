import './App.css';
import { useEffect, useState } from 'react';
import mineLogo from './media/minepumpkin.png';
import mineBad from './media/mine.png'

function App() {
  const [grid, setGrid] = useState(0);
  const [mines, setMines] = useState(0);

  function showFormIfInputGood() {
    document.getElementById("form3").style.visibility = "visible";
    document.getElementById("form4").style.visibility = "visible";
  }
  function hideFormIfInputBad() {
    document.getElementById("form3").style.visibility = "hidden";
    document.getElementById("form4").style.visibility = "hidden";

  }
  function clickSpawn() {
    prompt("There are " + grid + "x" + grid + " spaces and there are " + mines + " mines.")
  } // This will be used to run the program, right now it is reacting for testing purposes.

  useEffect(() => {
    if (grid > 1 && grid < 70 && (grid * grid) > mines) {
      showFormIfInputGood();
    }
    else {
      hideFormIfInputBad();
    }
  })
    
  return (
    <div className="App">Le App
      <header className="App-header">
          <p className='form1'> 
          <label>Number of Boxes: </label>
          <input type="text" value={grid} onChange={e => setGrid(e.target.value)}></input> <label value={grid} >x{grid}</label>
          </p>
          <p className='form2'>
          <label>Number of Mines: </label>
          <input type="text" value={mines} placeholder={Math.ceil((grid * grid) / 5)} onChange={e => setMines(e.target.value)}></input>
          </p>
          <p className='form3' id='form3'>
          <label>Spawn a <span className='beigeletters'>{grid}x{grid}</span> board with <span className='redletters'>{mines}</span> mines.</label>
          <button className='spawnbutton' onClick={() => { clickSpawn()}}>Spawn</button>
          </p>
        <p className='form4' id='form4'>
        <GameGrid gridnum={grid} minenum={mines}/></p>
      </header>
    </div>
  );
}

const handleClick = (event, key) => {
  console.log();
  console.log('this is ' + event.target.className + ' number: ', key);
};

function GameGrid(props) {
  const row_length = props.gridnum;
  const num_grid = row_length * row_length;
  const mines = props.minenum;
  let gameGrid = [];
  const gameColumns = [];
  let c = 0;
  const mineArray = []; 
  
  // makes array of non-mine objects
  for (let i=0; i < num_grid; i++) {
    gameGrid.push(<img alt="mine?" onClick={e => handleClick(e, i)} className="notMine" src={mineLogo}></img>)
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



export default App;
