import { useState } from "react";
import Board from "./components/Board";

function App() {
  const [boardSize, setBoardSize] = useState(5);
  const [started, setStarted] = useState(false);
  const [emptyBoard, setEmptyBoard] = useState([])

  function startClicked() {
    setStarted(true);
    setBoardSize()

    const newBoard = []
    for (let i = 0; i < boardSize; i++) {
      newBoard.push(i)
    }
    setEmptyBoard(newBoard)
  }

  console.log(emptyBoard);

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
            onChange={(e)=>{setBoardSize(e.target.value)}}
          />
        </div>
        <button className="my-button" onClick={startClicked}>
          {started? "Restart" : "Start"}
        </button>
      </div>
      <Board started={started} emptyBoard={emptyBoard}/>
    </>
  );
}

export default App;
