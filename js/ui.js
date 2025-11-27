export function showFindingRoute() {
  document.getElementById("findingRoute").style.display = "block";
}

export function hideFindingRoute() {
  document.getElementById("findingRoute").style.display = "none";
}

export function toggleJson() {
  const box = document.getElementById("jsonOutput");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

export function resetUI() {
  hideFindingRoute();
  document.getElementById("difficulty").textContent = "Difficulty: -";
  document.getElementById("stats").innerHTML =
    "Ascent: -<br>Descent: -<br>Max Grade: -";
  document.getElementById("jsonOutput").textContent =
    "Generate a route to see JSON data here.";
}

export function updateStats(totalUp, totalDown, maxSlope) {
  document.getElementById("stats").innerHTML =
    `Ascent: ${totalUp.toFixed(1)}%<br>` +
    `Descent: ${totalDown.toFixed(1)}%<br>` +
    `Max Grade: ${maxSlope.toFixed(1)}%`;
}

export function updateDifficulty(totalUp) {
  let diff = "Easy";
  if (totalUp > 20 && totalUp <= 40) diff = "Moderate";
  else if (totalUp > 40 && totalUp <= 60) diff = "Hard";
  else if (totalUp > 60) diff = "Brutal";

  document.getElementById("difficulty").textContent = `Difficulty: ${diff}`;
}
