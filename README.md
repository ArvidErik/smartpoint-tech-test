# SIMPLE BOARD GAME TECH CHALLENGE

This project is a simple 2-player browser game developed in a frame of a tech test. Thanks a lot for the opportunity! I enjoyed it!

## Deployment Link
https://simpleboardgame-sp.netlify.app/

## Info
After an initial npm install, a simple “npm start” command should start the application.

## Context

There is a 1-dimension board with “N” fields, and 2 players: red and blue. Initially the board has
some red and some blue pieces. The players alternately make moves to color the fields. Who
can fill the board fully with his color, wins. A player also wins if he can capture all fields of the
opponent (ie. the opponent doesn’t have any fields of his color on the table).

## State variables

| Name | Definition | Location |
| ------------- | ------------- | ------------- |
| boardSize  | Stores the size of the board given by the input  | App.js |
| gameBoard  | The actual information about the fields  | App.js |
| currentPlayer  | Informationa about who is the active player  | App.js |
| started  | Checks is the game is started (styling purposes) | App.js |
| winning  | Check is the game has ended  | App.js |

## Architecture
![image of the architecture](/public/boardgame-arch.png)