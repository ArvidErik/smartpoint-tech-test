import React from "react";

function Board({ started, emptyBoard, nextPlayer, setEmptyBoard }) {
  //FUNCTIONS
  function fieldClick(field) {
    if (!ownFieldCheck(field)) {
      const firstMove = stealField(field);
      let updatedBoard;

      if (field.id > 0) {
        updatedBoard = checkBelow(field, firstMove);
      }
      if (field.id < emptyBoard.length - 1) {
        updatedBoard = checkAbove(field, updatedBoard?updatedBoard:firstMove);
      }

      console.log("FINAL BOARD", updatedBoard);
      setEmptyBoard(updatedBoard);
      // winCheck()
      // switchPlayer()
    }
  }

  function ownFieldCheck(field) {
    if (field.owner == nextPlayer) {
      return true;
    } else {
      return false;
    }
  }

  function stealField(targetField) {
    const updatedField = {
      id: targetField.id,
      owner: nextPlayer,
    };

    const newBoard = [...emptyBoard].map((element, i) => {
      if (i == targetField.id) {
        return updatedField;
      } else {
        return element;
      }
    });

    return newBoard;
  }

  function checkBelow(field, arr) {
    console.log("Checking Below");

    let board = arr;
    let i = field.id - 1;
    let newArr = [];
    newArr.push(field);
    console.log("NextPlayer is", nextPlayer);

    while (newArr.filter((e) => e.owner == nextPlayer).length < 1 && i >= 0) {
      newArr.push(board[i]);
      i--;
    }
    console.log("BELOW ARR", newArr);

    let countEmpty = 0;
    let countEnemy = 0;
    let countOwn = 0;

    let waitingplayer;
    if (nextPlayer == "p1") {
      waitingplayer = "p2";
    } else {
      waitingplayer = "p1";
    }

    for (let j = 1; j < newArr.length; j++) {
      if (newArr[j].owner == "") {
        countEmpty++;
      }
      if (newArr[j].owner == waitingplayer) {
        countEnemy++;
      }
      if (newArr[j].owner == nextPlayer) {
        countOwn++;
      }
    }

    if (
      countOwn > 0 &&
      ((countEmpty > 0 && countEnemy < 1) || (countEmpty < 1 && countEnemy > 0))
    ) {
      let newBoard = [...board];

      for (let index = 0; index < newArr.length; index++) {
        let newObj = {
          id: newArr[index].id,
          owner: nextPlayer,
        };

        newBoard.splice(newArr[index].id, 1, newObj);
      }

      console.log("BELOWBOARD", newBoard);
      return newBoard;
    } else {
      console.log("BELOWBOARD2", board);
      return board;
    }
  }

  function checkAbove(field, arr) {
    console.log("Checking Above");
    const board = arr;
    let i = field.id + 1;
    let newArr = [field];
    console.log("NextPlayer is", nextPlayer);
    console.log("BOARD IS", board);
    
    while (
      newArr.filter((e) => e.owner == nextPlayer).length < 1 &&
      i <= board.length - 1
      ) {
      console.log("NEW ARRAY IS", newArr);
      newArr.push(board[i]);
      i++;
    }
    console.log("ABOVE ARR", newArr);

    let countEmpty = 0;
    let countEnemy = 0;
    let countOwn = 0;

    let waitingplayer;
    if (nextPlayer == "p1") {
      waitingplayer = "p2";
    } else {
      waitingplayer = "p1";
    }

    for (let j = 1; j < newArr.length; j++) {
      if (newArr[j].owner == "") {
        countEmpty++;
      }
      if (newArr[j].owner == waitingplayer) {
        countEnemy++;
      }
      if (newArr[j].owner == nextPlayer) {
        countOwn++;
      }
    }

    if (
      countOwn > 0 &&
      ((countEmpty > 0 && countEnemy < 1) || (countEmpty < 1 && countEnemy > 0))
    ) {
      let newBoard = [...board];

      for (let index = 0; index < newArr.length; index++) {
        let newObj = {
          id: newArr[index].id,
          owner: nextPlayer,
        };

        newBoard.splice(newArr[index].id, 1, newObj);
      }

      console.log("ABOVE BOARD", newBoard);
      return newBoard;
    } else {
      console.log("ABOVE BOARD2", board);
      return board;
    }
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
