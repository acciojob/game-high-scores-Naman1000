// Get DOM elements
const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const scores = document.getElementById("scores");

// Save score to Local Storage
function saveScore() {
  const name = nameInput.value.trim();
  const score = scoreInput.value.trim();

  if (name === "" || score === "" || isNaN(score)) {
    alert("Please enter a valid name and numeric score.");
    return;
  }

  // Get existing scores or initialize an empty array
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Add new score
  highScores.push({ name: name, score: parseInt(score) });

  // Save updated scores back to Local Storage
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // Clear input fields
  nameInput.value = "";
  scoreInput.value = "";

  // Update the scores display
  showScores();
}

// Show scores in div
function showScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Clear previous content
  scores.innerHTML = "";

  if (highScores.length === 0) {
    scores.textContent = "No scores yet";
    return;
  }

  // Create table
  const table = document.createElement("table");
  const headerRow = document.createElement("tr");

  const nameHeader = document.createElement("th");
  nameHeader.textContent = "Name";
  const scoreHeader = document.createElement("th");
  scoreHeader.textContent = "Score";

  headerRow.appendChild(nameHeader);
  headerRow.appendChild(scoreHeader);
  table.appendChild(headerRow);

  // Add rows for each score
  highScores.forEach(entry => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = entry.name;

    const scoreCell = document.createElement("td");
    scoreCell.textContent = entry.score;

    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    table.appendChild(row);
  });

  scores.appendChild(table);
}
