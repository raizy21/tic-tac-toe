// this file contains the configuration for the player
function openPlayerConfig() {
  console.log("openPlayerConfig function called");

  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

// this function closes the player configuration overlay and the backdrop
function closePlayerConfig() {
  console.log("closePlayerConfig function called");

  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
}
