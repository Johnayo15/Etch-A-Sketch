// -------------------- Track State --------------------
let currentMode = "black"; // default drawing mode
let gridVisible = true; // track whether borders are visible

// -------------------- Select Elements --------------------
const container = document.querySelector("#container");
const button = document.querySelector("#resizeBtn");
const clearButton = document.querySelector("#clearBtn");
const blackBtn = document.querySelector("#blackBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const darkenBtn = document.querySelector("#darkenBtn");
const toggleGridBtn = document.querySelector("#toggleGridBtn");

// -------------------- Initialize Default Grid --------------------
createGrid(16); // 16x16 default grid

// -------------------- Resize / New Grid Button --------------------
button.addEventListener("click", function () {
  let size;

  while (true) {
    size = prompt("Enter number of squares per side (max 100):");

    if (size === null) return; // exit if canceled

    size = Number(size);

    if (Number.isInteger(size) && size > 0 && size <= 100) break;

    alert("Invalid input. Please enter a number between 1 and 100.");
  }

  createGrid(size);
});

// -------------------- Add Hover Behavior to Each Square --------------------
function addSquareBehavior(square) {
  let darkness = 0; // for progressive darkening mode

  square.addEventListener("mouseover", function () {
    if (currentMode === "black") {
      square.style.backgroundColor = "black";
      square.style.opacity = 1;
    } else if (currentMode === "rainbow") {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      square.style.opacity = 1;
    } else if (currentMode === "darken") {
      if (darkness < 10) {
        darkness++;
        square.style.backgroundColor = "black";
        square.style.opacity = darkness / 10;
      }
    }
  });
}

// -------------------- Create Grid --------------------
function createGrid(size) {
  container.innerHTML = ""; // clear existing squares

  const squareSize = 960 / size; // calculate square size

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");

    square.classList.add("square");
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";

    // Respect current grid border state
    square.style.border = gridVisible ? "1px solid #ccc" : "none";

    addSquareBehavior(square);

    container.appendChild(square);
  }
}

// -------------------- Clear Grid Button --------------------
clearButton.addEventListener("click", function () {
  const squares = document.querySelectorAll(".square");

  squares.forEach(function (square) {
    square.style.backgroundColor = "";
    square.style.opacity = 1; // reset opacity if darken mode was used
  });
});

// -------------------- Color Mode Buttons --------------------
blackBtn.addEventListener("click", () => (currentMode = "black"));
rainbowBtn.addEventListener("click", () => (currentMode = "rainbow"));
darkenBtn.addEventListener("click", () => (currentMode = "darken"));

// -------------------- Grid Lines Toggle --------------------
toggleGridBtn.addEventListener("click", function () {
  gridVisible = !gridVisible;

  const squares = document.querySelectorAll(".square");

  squares.forEach(function (square) {
    square.style.border = gridVisible ? "1px solid #ccc" : "none";
  });

  toggleGridBtn.textContent = gridVisible
    ? "Hide Grid Lines"
    : "Show Grid Lines";
});
