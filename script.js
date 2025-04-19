const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const scores = document.getElementById("scores");

function saveScore() {
  const name = nameInput.value.trim();
  const score = parseInt(scoreInput.value.trim());

  if (!name || isNaN(score)) return;

  // Use key: "scores" (not "highScores")
  const savedScores = JSON.parse(localStorage.getItem("scores")) || [];

  savedScores.push({ name, score });

  localStorage.setItem("scores", JSON.stringify(savedScores));

  nameInput.value = "";
  scoreInput.value = "";

  showScores();
}

function showScores() {
  const savedScores = JSON.parse(localStorage.getItem("scores")) || [];

  scores.innerHTML = "";

  if (savedScores.length === 0) {
    scores.textContent = "No scores yet";
    return;
  }

  // Sort scores in descending order
  savedScores.sort((a, b) => b.score - a.score);

  const table = document.createElement("table");
  const headerRow = document.createElement("tr");

  const nameHeader = document.createElement("th");
  nameHeader.textContent = "Name";
  const scoreHeader = document.createElement("th");
  scoreHeader.textContent = "Score";

  headerRow.appendChild(nameHeader);
  headerRow.appendChild(scoreHeader);
  table.appendChild(headerRow);

  savedScores.forEach(({ name, score }) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const scoreCell = document.createElement("td");

    nameCell.textContent = name;
    scoreCell.textContent = score;

    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    table.appendChild(row);
  });

  scores.appendChild(table);
}

// Show scores on page load
showScores();
