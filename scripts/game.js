// dispay the game area
function startNewGame() {
  if (!players[0].name || !players[1].name) {
    alert("please set custom player names for both players!");
    return;
  }

  gameAreaElement.style.display = "block";
}

// switch the player who can select a field
function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
}

// select area on the game board
function selectGameField(event) {
  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");
  switchPlayer();
}
