// display the game area
function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("please set custom player names for both players!");
    return;
  }

  activePlayerNameElement.textContent = players[activePlayer].name;
  // console.log(players[activePlayer].name);
  gameAreaElement.style.display = "block";
}

// switch the player who can select a field
function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
  // console.log(activePlayer);
}

// select area on the game board
function selectGameField(event) {
  // console.log(event.target.tagName);

  if (event.target.tagName !== "LI") {
    return;
  }

  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("please select an empty field!");
    return;
  }

  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  // console.log(gameData);
  const winnerId = checkForGameOver();
  // console.log(winnerId);

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  // increasing the round
  currentRound++;

  // swith the player
  switchPlayer();
}

function checkForGameOver() {
  // checking the rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      // console.log(gameData[i][0]);
      return gameData[i][0];
    }
  }

  // checking the columns for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      // console.log(gameData[0][i]);
      return gameData[0][i];
    }
  }

  // checking the diagonals for equality: top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    // console.log(gameData[0][0]);
    return gameData[0][0];
  }

  // checking the diagonals for equality: left to top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    // console.log(gameData[2][0]);
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  gameOverTextElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverWinnerElement.textContent = winnerName + " wins!";
  } else {
    gameOverTextElement.textContent = "it is a draw!";
  }
}
