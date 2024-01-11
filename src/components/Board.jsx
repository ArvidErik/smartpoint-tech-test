import React from "react";

function Board({
  started,
  gameBoard,
  currentPlayer,
  setGameBoard,
  setcurrentPlayer,
  winning,
  setWinning,
}) {
  //FUNCTIONS
  function fieldClick(field) {
    //HANDLES THE FIELD CLICK EVENT
    if (!ownFieldCheck(field) && !winning) {
      //IF THE FIELD IS NOT OWN, STEALS IT
      const firstMove = stealField(field);
      let updatedBoard;

      //CHECKING BELOW FIELDS
      if (field.id > 0) {
        updatedBoard = checkSide(field, firstMove, "below");
      }
      //CHECKING ABOVE FIELDS
      if (field.id < gameBoard.length - 1) {
        updatedBoard = checkSide(
          field,
          updatedBoard ? updatedBoard : firstMove,
          "above"
        );
      }
      setGameBoard(updatedBoard);
      winCheck(updatedBoard);
    }
  }

  function ownFieldCheck(field) {
    if (field.owner == currentPlayer) {
      return true;
    } else {
      return false;
    }
  }

  function stealField(targetField) {
    const updatedField = {
      id: targetField.id,
      owner: currentPlayer,
    };

    const newBoard = [...gameBoard].map((element, i) => {
      if (i == targetField.id) {
        return updatedField;
      } else {
        return element;
      }
    });

    return newBoard;
  }

  function checkSide(field, arr, dir) {
    let board = arr;
    let i;
    if (dir == "below") {
      i = field.id - 1;
    } else {
      i = field.id + 1;
    }
    let newArr = [field];

    //SCANNING THE LEFT SIDE WHILE OWN FIELD IS FOUND
    if (dir == "below") {
      while (
        newArr.filter((e) => e.owner == currentPlayer).length < 1 &&
        i >= 0
      ) {
        newArr.push(board[i]);
        i--;
      }
    } else {
      while (
        newArr.filter((e) => e.owner == currentPlayer).length < 1 &&
        i <= board.length - 1
      ) {
        newArr.push(board[i]);
        i++;
      }
    }

    let countEmpty = 0;
    let countEnemy = 0;
    let countOwn = 0;

    let waitingplayer;
    if (currentPlayer == "p1") {
      waitingplayer = "p2";
    } else {
      waitingplayer = "p1";
    }

    //COUNTING THE TYPE OF OWNER OF THE FIELDS
    for (let j = 1; j < newArr.length; j++) {
      if (newArr[j].owner == "") {
        countEmpty++;
      }
      if (newArr[j].owner == waitingplayer) {
        countEnemy++;
      }
      if (newArr[j].owner == currentPlayer) {
        countOwn++;
      }
    }

    //IF THERE IS ONLY ONE TYPE OF OWNER UNTIL THE OWN FILED, IT RECOLORS THE FILEDS OTHERWISE RETURNS THE PRELIMINARY ARRAY
    if (
      countOwn > 0 &&
      ((countEmpty > 0 && countEnemy < 1) || (countEmpty < 1 && countEnemy > 0))
    ) {
      let newBoard = [...board];

      for (let index = 0; index < newArr.length; index++) {
        let newObj = {
          id: newArr[index].id,
          owner: currentPlayer,
        };

        newBoard.splice(newArr[index].id, 1, newObj);
      }

      return newBoard;
    } else {
      return board;
    }
  }

  function winCheck(board) {
    //COUNTS THE TYPE OF OWNER OF THE FIELDS. IF THERE IS ONLY 1, SETS WINNING
    let p1Counter = 0;
    let p2Counter = 0;

    board.forEach((e) => {
      if (e.owner == "p1") {
        p1Counter++;
      } else if (e.owner == "p2") {
        p2Counter++;
      }
    });

    if (
      (p1Counter > 0 && p2Counter == 0) ||
      (p2Counter > 0 && p1Counter == 0)
    ) {
      setWinning(true);
    } else {
      if (currentPlayer == "p1") {
        return setcurrentPlayer("p2");
      } else {
        return setcurrentPlayer("p1");
      }
    }
  }

  return (
    <div className="flex">
      <div id="board" className={`flex-row ${!started && "hidden"}`}>
        {gameBoard.map((element) => {
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
      <h2
        className={`next-player ${!started && "hidden"} ${winning && "hidden"}`}
      >
        <span className={`${currentPlayer == "p1" ? "player1" : "player2"}`}>
          {currentPlayer == "p1" ? "Player 1" : "Player 2"}
        </span>
        , it is your turn
      </h2>
      <h1
        className={`next-player fade-in-text ${!started && "hidden"} ${
          !winning && "hidden"
        }`}
      >
        <span className={`${currentPlayer == "p1" ? "player1" : "player2"}`}>
          {currentPlayer == "p1" ? "Player 1 " : "Player 2 "}
        </span>
        is the winner
      </h1>
    </div>
  );
}

export default Board;
