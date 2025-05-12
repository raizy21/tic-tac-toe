/**
 * @jest-environment jsdom
 */

// Set up a minimal DOM for testing
document.body.innerHTML = `
  <div id="backdrop" style="display: none;"></div>
  <div id="config-overlay" style="display: none;">
    <form id="config-form">
      <div class="form-control">
        <label for="player-name">Player name</label>
        <input type="text" name="player-name" id="player-name" />
        <p id="config-errors"></p>
      </div>
      <div>
        <button type="reset" class="btn btn-alt">Cancel</button>
        <button type="submit" class="btn">Confirm</button>
      </div>
    </form>
  </div>
  <div id="game-configuration">
    <div class="player-config">
      <h2>Player 1</h2>
      <div id="player-1-data">
        <p>Player 1</p>
        <p>Player Name</p>
      </div>
      <button class="btn btn-alt" id="edit-player-1-btn" data-playerid="1">Edit</button>
    </div>
    <div class="player-config">
      <h2>Player 2</h2>
      <div id="player-2-data">
        <p>Player 2</p>
        <p>Player Name</p>
      </div>
      <button class="btn btn-alt" id="edit-player-2-btn" data-playerid="2">Edit</button>
    </div>
  </div>
`;

// Global variables
let editedPlayer = 0;
const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

// DOM elements
const playerConfigOverlayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.getElementById("config-form");
const errorOutputElement = document.getElementById("config-errors");

// Config functions
function openPlayerConfig(event) {
  const selectedPlayerId = +event.target.dataset.playerid;
  editedPlayer = selectedPlayerId;
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("player-name").trim();

  if (!enteredPlayerName) {
    event.target.firstElementChild.classList.add("error");
    errorOutputElement.textContent = "please enter a valid name!";
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );

  updatedPlayerDataElement.children[1].textContent = enteredPlayerName;
  players[editedPlayer - 1].name = enteredPlayerName;

  closePlayerConfig();
}

describe("Player Configuration Tests", () => {
  beforeEach(() => {
    // Reset state before each test
    editedPlayer = 0;
    players[0].name = "";
    players[1].name = "";

    // Reset DOM elements
    playerConfigOverlayElement.style.display = "none";
    backdropElement.style.display = "none";
    formElement.firstElementChild.classList.remove("error");
    errorOutputElement.textContent = "";
    formElement.firstElementChild.lastElementChild.value = "";

    document.getElementById("player-1-data").children[1].textContent =
      "Player Name";
    document.getElementById("player-2-data").children[1].textContent =
      "Player Name";
  });

  // Test 1: Opening player config sets correct player ID
  test("openPlayerConfig should set the correct player ID and show overlay", () => {
    const mockEvent = {
      target: { dataset: { playerid: "2" } },
    };

    openPlayerConfig(mockEvent);

    expect(editedPlayer).toBe(2);
    expect(playerConfigOverlayElement.style.display).toBe("block");
    expect(backdropElement.style.display).toBe("block");
  });

  // Test 2: Closing player config resets UI
  test("closePlayerConfig should hide overlay and reset form", () => {
    // Set up display and form with error state
    playerConfigOverlayElement.style.display = "block";
    backdropElement.style.display = "block";
    formElement.firstElementChild.classList.add("error");
    errorOutputElement.textContent = "Error message";
    formElement.firstElementChild.lastElementChild.value = "Test name";

    closePlayerConfig();

    expect(playerConfigOverlayElement.style.display).toBe("none");
    expect(backdropElement.style.display).toBe("none");
    expect(formElement.firstElementChild.classList.contains("error")).toBe(
      false
    );
    expect(errorOutputElement.textContent).toBe("");
    expect(formElement.firstElementChild.lastElementChild.value).toBe("");
  });

  // Test 3: Saving config with empty name shows error
  test("savePlayerConfig should show error for empty name", () => {
    // Setup form submission with empty name
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        firstElementChild: {
          classList: { add: jest.fn() },
        },
      },
    };

    // Mock FormData
    global.FormData = jest.fn(() => ({
      get: jest.fn(() => ""),
    }));

    savePlayerConfig(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(
      mockEvent.target.firstElementChild.classList.add
    ).toHaveBeenCalledWith("error");
    expect(errorOutputElement.textContent).toBe("please enter a valid name!");
  });

  // Test 4: Saving config updates player name
  test("savePlayerConfig should update player name for valid input", () => {
    // Setup
    editedPlayer = 1;
    const playerName = "John Doe";

    const mockEvent = {
      preventDefault: jest.fn(),
      target: formElement,
    };

    // Mock FormData
    global.FormData = jest.fn(() => ({
      get: jest.fn(() => playerName),
    }));

    // Execute
    savePlayerConfig(mockEvent);

    // Verify
    expect(players[0].name).toBe(playerName);
    expect(
      document.getElementById("player-1-data").children[1].textContent
    ).toBe(playerName);
    expect(playerConfigOverlayElement.style.display).toBe("none"); // Verify overlay is closed
  });

  // Test 5: Complete flow - open, enter name, save
  test("Complete player configuration flow", () => {
    // 1. Open config for player 2
    const openEvent = {
      target: { dataset: { playerid: "2" } },
    };

    openPlayerConfig(openEvent);
    expect(editedPlayer).toBe(2);
    expect(playerConfigOverlayElement.style.display).toBe("block");

    // 2. Save with valid name
    const playerName = "Jane Smith";
    const saveEvent = {
      preventDefault: jest.fn(),
      target: formElement,
    };

    // Mock FormData
    global.FormData = jest.fn(() => ({
      get: jest.fn(() => playerName),
    }));

    savePlayerConfig(saveEvent);

    // 3. Verify results
    expect(players[1].name).toBe(playerName);
    expect(
      document.getElementById("player-2-data").children[1].textContent
    ).toBe(playerName);
    expect(playerConfigOverlayElement.style.display).toBe("none");
    expect(backdropElement.style.display).toBe("none");
  });
});
