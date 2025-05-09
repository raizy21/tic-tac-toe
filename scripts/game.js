// display the game area
function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("please set custom player names for both players!");
    return;
  }

  activePlayerNameElement.textContent = players[activePlayer].name;
  console.log(players[activePlayer].name);
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
  console.log(event.target.tagName);

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
  console.log(gameData);

  switchPlayer();
}
