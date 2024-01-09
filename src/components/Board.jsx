import React from "react";

function Board({ started, emptyBoard }) {
  return (
    <div id="board" className={`flex-row ${!started && `hidden`}`}>
      {emptyBoard.map((id)=>{
        return <div className="field"></div>
      })}
    </div>
  );
}

export default Board;
