import { useState } from "react";
import Board from "./components/Board";

function App() {
  const [boardSize, setBoardSize] = useState(5);
  const [gameBoard, setGameBoard] = useState([]);
  const [currentPlayer, setcurrentPlayer] = useState("");
  const [started, setStarted] = useState(false);
  const [winning, setWinning] = useState(false); 

  //FUNCTIONS
  function startClicked() {
    //WHEN THE START BUTTON IS CLICKED
    setStarted(true);
    createBoard();
    setWinning(false)
  }

  function boardSizeInputCheck(size) {
    if (size < 5) {
      setBoardSize(5);
    } else if (size > 100) {
      setBoardSize(100);
    } else {
      setBoardSize(size);
    }
  }

  function createBoard() {
    //CREATES AN EMPTY BOARD WITH THE SIZE
    const newBoard = [];
    for (let i = 0; i < boardSize; i++) {
      newBoard.push({
        id: i,
        owner: "",
      });
    }
    initialRandomSetup(newBoard);
  }

  function initialRandomSetup(newBoard) {
    const p1Fields = [];
    const p2Fields = [];

    const iterationNumber = Math.floor(newBoard.length * 0.2);

    //GET RANDOM INDEXES IN 20%
    for (let i = 0; i < iterationNumber; i++) {
      let p1Field = Math.floor(Math.random() * newBoard.length);
      while (p1Fields.includes(p1Field)) {
        p1Field = Math.floor(Math.random() * newBoard.length);
      }
      p1Fields.push(p1Field);
    }

    for (let i = 0; i < iterationNumber; i++) {
      let p2Field = Math.floor(Math.random() * newBoard.length);
      while (p1Fields.includes(p2Field) || p2Fields.includes(p2Field)) {
        p2Field = Math.floor(Math.random() * newBoard.length);
      }
      p2Fields.push(p2Field);
    }

    let startingBoard = [];

    //CREATE THE FIELD OBJECTS 
    for (let i = 0; i < newBoard.length; i++) {
      if (p1Fields.includes(i)) {
        const element = {
          id: i,
          owner: "p1",
        };
        startingBoard.push(element);
      } else if (p2Fields.includes(i)) {
        const element = {
          id: i,
          owner: "p2",
        };
        startingBoard.push(element);
      } else {
        const element = {
          id: i,
          owner: "",
        };
        startingBoard.push(element);
      }
    }

    setGameBoard(startingBoard);
    setcurrentPlayer(randomPlayer());
  }

  function randomPlayer() {
    //SELECT A RANDOM PLAYER
    const players = ["p1", "p2"];
    const randomNumber = Math.floor(Math.random() * players.length);
    const randomPlayer = players[randomNumber];

    return randomPlayer;
  }

  return (
    <>
      <div id="app" className="flex">
        <h1>Simple Board Game</h1>
        <div className={`flex ${started && "hidden"}`}>
          <h2>Please select a board size between 5 and 100!</h2>
          <input
            id="size-input"
            type="number"
            min="5"
            max="100"
            placeholder={boardSize}
            onChange={(e) => {
              boardSizeInputCheck(e.target.value);
            }}
          />
        </div>
        <button className="my-button" onClick={startClicked}>
          {started ? "Restart" : "Start"}
        </button>
      </div>
      <Board
        started={started}
        gameBoard={gameBoard}
        currentPlayer={currentPlayer}
        setGameBoard={setGameBoard}
        setcurrentPlayer={setcurrentPlayer}
        setWinning={setWinning}
        winning={winning}
      />
    </>
  );
}

export default App;
