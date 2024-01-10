import { useState } from "react";
import Board from "./components/Board";

function App() {
  const [boardSize, setBoardSize] = useState(5);
  const [started, setStarted] = useState(false);
  const [emptyBoard, setEmptyBoard] = useState([]);
  const [nextPlayer, setNextPlayer] = useState("")

  //LOGS
  console.log(nextPlayer);

  //FUNCTIONS

  function startClicked() {
    setStarted(true);
    createBoard();
  }

  function boardSizeInputCheck(size){
    if (size < 5) {
      setBoardSize(5)
    }
    else if (size > 100) {
      setBoardSize(100)
    }
    else {
      setBoardSize(size)
    }
  }

  function createBoard(){
    const newBoard = []
    for (let i = 0; i < boardSize; i++) {
      newBoard.push({
        id:i,
        owner: ""
      })
    }
    initialRandomSetup(newBoard)
  }

  function initialRandomSetup(newBoard){

    const p1Fields = []
    const p2Fields = []

    const iterationNumber = Math.floor(newBoard.length * 0.2)

    for (let i = 0; i < iterationNumber; i++) {
      let p1Field = Math.floor(Math.random() * newBoard.length)
      while (p1Fields.includes(p1Field)) {
        p1Field = Math.floor(Math.random() * newBoard.length)
      }
      p1Fields.push(p1Field)
    }

    for (let i = 0; i < iterationNumber; i++) {
      let p2Field = Math.floor(Math.random() * newBoard.length)
      while (p1Fields.includes(p2Field) || p2Fields.includes(p2Field)) {
        p2Field = Math.floor(Math.random() * newBoard.length)
      }
      p2Fields.push(p2Field)
    }

    let startingBoard = []

    for (let i = 0; i < newBoard.length; i++) {
      if (p1Fields.includes(i)) {
        const element = {
          id: i,
          owner: "p1"
        }
        startingBoard.push(element)
      } else if (p2Fields.includes(i)) {
        const element = {
          id: i,
          owner: "p2"
        }
        startingBoard.push(element)
      } else {
        const element = {
          id: i,
          owner: ""
        }
        startingBoard.push(element)
      }
    }

    setEmptyBoard(startingBoard)
    setNextPlayer(randomPlayer())
  }

  function randomPlayer(){
    const players = ["Player 1", "Player 2"]
    const randomNumber = Math.floor(Math.random()*players.length)
    const randomPlayer = players[randomNumber]

    return randomPlayer
  }


  return (
    <>
      <div id="app" className="flex">
        <h1>Simple Board Game</h1>
        <div className={`flex ${started&&"hidden"}`}>
          <h2>Please select a board size!</h2>
          <input
            id="size-input"
            type="number"
            min="5"
            max="100"
            placeholder={boardSize}
            onChange={(e)=>{boardSizeInputCheck(e.target.value)}}
          />
        </div>
        <button className="my-button" onClick={startClicked}>
          {started? "Restart" : "Start"}
        </button>
      </div>
      <Board started={started} emptyBoard={emptyBoard} nextPlayer={nextPlayer}/>
    </>
  );
}

export default App;
