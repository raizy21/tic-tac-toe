// this file contains the configuration for the player
function openPlayerConfig(event) {
  console.log("openPlayerConfig function called");

  const selectedPlayerId = +event.target.dataset.playerid;
  editedPlayer = selectedPlayerId; // get the player id from the data attribute of the clicked button
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

// this function closes the player configuration overlay and the backdrop
function closePlayerConfig() {
  console.log("closePlayerConfig function called");

  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error"); // remove the error class from the first element of the form
  errorOutputElement.textContent = ""; // clear the error message
}

function savePlayerConfig(event) {
  console.log("savePlayerConfig function called");

  event.preventDefault(); // prevent the form from submitting and reloading the page
  console.log(event);

  const formData = new FormData(event.target); // get the form data from the event target
  const enteredPlayerName = formData.get("player-name").trim(); // get the player name from the form data and trim it
  console.log(enteredPlayerName);

  if (!enteredPlayerName) {
    event.target.firstElementChild.classList.add("error"); // add the error class to the first element of the form
    errorOutputElement.textContent = "please enter a valid name!"; // if the player name is empty, show an error message
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  ); // get the player data element from the DOM using the edited player id

  updatedPlayerDataElement.children[1].textContent = enteredPlayerName; // update the player name in the UI
  closePlayerConfig(); // close the configuration overlay
}
