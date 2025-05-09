// console.log("checking if script is loaded");

// game logic
const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

// selecting elements from the DOM
let editedPlayer = 0;
let activePlayer = 0;

//player ui elements
const players = [
  { name: "", symbol: "x" },
  { name: "", symbol: "o" },
];

const playerConfigOverlayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");

const formElement = document.querySelector("form");
const errorOutputElement = document.getElementById("config-errors");
const gameAreaElement = document.getElementById("active-game");
const activePlayerNameElement = document.querySelector("#active-player-name");

const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");
const cancelConfigBtnElement = document.getElementById("cancel-config-btn");

const startNewGameBtnElement = document.getElementById("start-game-btn");
const gameBoardElement = document.getElementById("game-board");

//event listeners
editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);

cancelConfigBtnElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startNewGameBtnElement.addEventListener("click", startNewGame);

gameBoardElement.addEventListener("click", selectGameField);
