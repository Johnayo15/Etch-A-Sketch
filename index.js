const container = document.querySelector("#container");
for (let i = 0; i < 256; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  // Hover effect
  square.addEventListener("mouseover", function () {
    square.style.backgroundColor = "black";
  });
  container.appendChild(square);
}

const button = document.querySelector("#resizeBtn");
button.addEventListener("click", function () {
  let size;

  while (true) {
    size = prompt("Enter number of squares per side (max 100):");

    // If user presses Cancel
    if (size === null) {
      return;
    }

    size = Number(size);

    if (Number.isInteger(size) && size > 0 && size <= 100) {
      break;
    }

    alert("Invalid input. Please enter a number between 1 and 100.");
  }

  createGrid(size);
});

function addSquareBehavior(square) {
  let darkness = 0;

  square.addEventListener("mouseover", function () {
    if (darkness < 10) {
      darkness++;

      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${darkness / 10})`;
    }
  });
}

function createGrid(size) {
  container.innerHTML = "";

  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");

    square.classList.add("square");
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";

    addSquareBehavior(square);

    container.appendChild(square);
  }
}

//Clear grid after drawing
const clearButton = document.querySelector("#clearBtn");
clearButton.addEventListener("click", function () {
  const squares = document.querySelectorAll(".square");

  squares.forEach(function (square) {
    square.style.backgroundColor = "";
  });
});
