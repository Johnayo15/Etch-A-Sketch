// -------------------- Track State --------------------
let currentMode = "black"; // default drawing mode
let gridVisible = true; // track whether borders are visible

// -------------------- Select Elements --------------------
const container = document.querySelector("#container");
const resizeBtn = document.querySelector("#resizeBtn");
const clearBtn = document.querySelector("#clearBtn");
const blackBtn = document.querySelector("#blackBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const darkenBtn = document.querySelector("#darkenBtn");
const toggleGridBtn = document.querySelector("#toggleGridBtn");

// -------------------- Initialize Default Grid --------------------
createGrid(16); // default 16x16 grid

// -------------------- Resize / New Grid Button --------------------
resizeBtn.addEventListener("click", function () {
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

// -------------------- Initialize Each Square --------------------
function addSquareBehavior(square) {
  square.dataset.darkness = 0; // track progressive darkening per square
}

// -------------------- Create Grid --------------------
function createGrid(size) {
  container.innerHTML = ""; // clear existing squares
  const squareSize = 100 / size; // percentage for responsive squares

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = squareSize + "%";
    square.style.height = squareSize + "%";
    square.style.border = gridVisible ? "1px solid #ccc" : "none";

    addSquareBehavior(square); // initialize darkness
    container.appendChild(square);
  }
}

// -------------------- Hover Logic with Event Delegation --------------------
container.addEventListener("mouseover", function (e) {
  const square = e.target;
  if (!square.classList.contains("square")) return;

  let darkness = Number(square.dataset.darkness);

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
      square.dataset.darkness = darkness;
      square.style.backgroundColor = "black";
      square.style.opacity = darkness / 10;
    }
  }
});

// -------------------- Clear Grid Button --------------------
clearBtn.addEventListener("click", function () {
  const squares = document.querySelectorAll(".square");
  squares.forEach(function (square) {
    square.style.backgroundColor = "";
    square.style.opacity = 1;
    square.dataset.darkness = 0;
  });
});

// -------------------- Color Mode Buttons --------------------
blackBtn.addEventListener("click", () => (currentMode = "black"));
rainbowBtn.addEventListener("click", () => (currentMode = "rainbow"));
darkenBtn.addEventListener("click", () => (currentMode = "darken"));

// -------------------- Grid Lines Toggle Button --------------------
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
