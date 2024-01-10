import React from "react";

function Board({ started, emptyBoard, nextPlayer }) {
  return (
    <div className="flex">
      <div id="board" className={`flex-row ${!started && "hidden"}`}>
        {emptyBoard.map((element) => {
          return (
            <div
              key={element.id}
              className={`field ${element.owner == "p1" && "p1field"} ${
                element.owner == "p2" && "p2field"
              }`}
            ></div>
          );
        })}
      </div>
      <h2 className={`next-player ${!started && "hidden"}`}>
        <span className={`${nextPlayer == "Player 1" ? "player1" : "player2"}`}>{nextPlayer}</span>, it is your turn
      </h2>
    </div>
  );
}

export default Board;
