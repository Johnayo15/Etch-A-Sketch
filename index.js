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

    // Convert to number
    size = Number(size);

    // Check conditions
    if (Number.isInteger(size) && size > 0 && size <= 100) {
      break;
    }

    alert("Invalid input. Please enter a number between 1 and 100.");
  }

  createGrid(size);
});

function createGrid(size) {
  container.innerHTML = ""; // Remove old squares
  const squareSize = 960 / size; // Size per square in pixels

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";

    square.style.backgroundColor = "rgb(0,0,0)";
    square.style.opacity = 0; // initial opacity

    square.addEventListener("mouseover", function () {
      let currentOpacity = parseFloat(square.style.opacity);

      // Increase opacity by 0.1 per hover
      if (currentOpacity < 1) {
        currentOpacity += 0.1;
        square.style.opacity = currentOpacity;

        // Generate a random RGB color
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Apply random color with current opacity
        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }
    });
    container.appendChild(square);
  }
}
