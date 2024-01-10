import React from "react";

function Board({ started, emptyBoard }) {
  return (
    <div id="board" className={`flex-row ${!started && `hidden`}`}>
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
  );
}

export default Board;
