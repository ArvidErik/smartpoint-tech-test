import React from "react";

function Board({ started, emptyBoard, nextPlayer, setEmptyBoard }) {
  //FUNCTIONS
  function fieldClick(field) {
    console.log(field);
    console.log(ownFieldCheck(field));

    if (!ownFieldCheck(field)) {
      stealField(field)
    }
  }

  function ownFieldCheck (field) {
    if (field.owner == nextPlayer) {
      return true
    } else {
      return false
    }
  }

  function stealField(targetField){
    const updatedField = {
      id:targetField.id,
      owner:nextPlayer
    }

    console.log("empty",emptyBoard);
    console.log("fieldid",targetField.id);
    const newBoard = [...emptyBoard].map((element, i)=>{
      if (i == targetField.id) {
        return updatedField
      } else {
        return element
      }
    })
    console.log("NEWBOARD", newBoard);
    setEmptyBoard(newBoard)
  }

  return (
    <div className="flex">
      <div id="board" className={`flex-row ${!started && "hidden"}`}>
        {emptyBoard.map((element) => {
          return (
            <div
              key={element.id}
              id={element.id}
              className={`field ${element.owner == "p1" && "p1field"} ${
                element.owner == "p2" && "p2field"
              }`}
              onClick={() => {
                fieldClick(element);
              }}
            ></div>
          );
        })}
      </div>
      <h2 className={`next-player ${!started && "hidden"}`}>
        <span className={`${nextPlayer == "p1" ? "player1" : "player2"}`}>
          {nextPlayer == "p1" ? "Player 1" : "Player 2"}
        </span>
        , it is your turn
      </h2>
    </div>
  );
}

export default Board;
