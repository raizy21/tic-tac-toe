/**
 * @jest-environment jsdom
 */

// set up a minimal Ddom for testing
document.body.innerHTML = `
  <div id="game-over" style="display: none;">
    <p id="game-over-text">
      <span id="winner-name"></span>
    </p>
  </div>
  <p>It's <span id="active-player-name">player name</span>'s turn!</p>
  <section id="game-area" style="display: none;">
    <ol id="game-board">
      <li data-row="1" data-col="1"></li>
      <li data-row="1" data-col="2"></li>
      <li data-row="1" data-col="3"></li>
      <li data-row="2" data-col="1"></li>
      <li data-row="2" data-col="2"></li>
      <li data-row="2" data-col="3"></li>
      <li data-row="3" data-col="1"></li>
      <li data-row="3" data-col="2"></li>
      <li data-row="3" data-col="3"></li>
    </ol>
  </section>
`;

// global variables
let gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;
const players = [
  {
    name: "player 1",
    symbol: "X",
  },
  {
    name: "player 2",
    symbol: "O",
  },
];

// dom elements
const gameOverElement = document.getElementById("game-over");
const gameOverTextElement = document.getElementById("game-over-text");
const gameOverWinnerElement = document.getElementById("winner-name");
const gameAreaElement = document.getElementById("game-area");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameBoardElement = document.getElementById("game-board");

// mock alert
global.alert = jest.fn();

// game functions
function resetGameStatus() {
  gameOverElement.style.display = "none";

  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItem = gameBoardElement.children[gameBoardIndex];
      gameBoardItem.textContent = "";
      gameBoardItem.classList.remove("disabled");

      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("please set custom player names for both players!");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsOver) {
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

  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  // Row check
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // Column check
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Diagonal check (top left to bottom right)
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Diagonal check (bottom left to top right)
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverWinnerElement.textContent = winnerName + " wins!";
  } else {
    gameOverTextElement.textContent = "it is a draw!";
  }
}

// Simple tests
describe("Tic Tac Toe Game - Simple Tests", () => {
  beforeEach(() => {
    // Reset game state before each test
    gameData = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;

    // Reset DOM elements
    gameAreaElement.style.display = "none";
    gameOverElement.style.display = "none";

    // Reset all board cells
    for (let i = 0; i < gameBoardElement.children.length; i++) {
      gameBoardElement.children[i].textContent = "";
      gameBoardElement.children[i].className = "";
    }

    // Clear mocks
    jest.clearAllMocks();
  });

  // test 1: game starts with Player 1
  test("game should start with Player 1", () => {
    startNewGame();
    expect(activePlayer).toBe(0);
    expect(activePlayerNameElement.textContent).toBe("player 1");
  });

  // test 2: switch player works correctly
  test("switchPlayer should change active player", () => {
    activePlayer = 0;
    switchPlayer();
    expect(activePlayer).toBe(1);

    switchPlayer();
    expect(activePlayer).toBe(0);
  });

  // test 3: game board should be empty after reset
  test("resetGameStatus should clear the game board", () => {
    // setup a non-empty board
    gameData[0][0] = 1;
    gameData[1][1] = 2;

    resetGameStatus();

    // check if board is cleared
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        expect(gameData[i][j]).toBe(0);
      }
    }
  });

  // test 4: player can mark a field
  test("selectGameField should mark selected field with player symbol", () => {
    const mockEvent = {
      target: {
        tagName: "LI",
        dataset: { row: "1", col: "1" },
        textContent: "",
        classList: { add: jest.fn() },
      },
    };

    selectGameField(mockEvent);

    expect(gameData[0][0]).toBe(1); // player 1's mark
    expect(mockEvent.target.textContent).toBe("X"); // player 1's symbol
  });

  // Test 5: Can't select already marked field
  test("cannot select already marked field", () => {
    // pre-mark a field
    gameData[0][0] = 1;

    const mockEvent = {
      target: {
        tagName: "LI",
        dataset: { row: "1", col: "1" },
        textContent: "X",
        classList: { add: jest.fn() },
      },
    };

    selectGameField(mockEvent);

    // alert should be called
    expect(alert).toHaveBeenCalledWith("please select an empty field!");
  });
});
