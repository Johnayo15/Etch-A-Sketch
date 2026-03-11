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
  let size = prompt("Enter number of squares per side (max 100):");

  if (size > 100) {
    alert("Maximum allowed is 100");
    return;
  }

  // Clear container and create new grid
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

    square.style.backgroundColor = "black";
    square.style.opacity = 0; // Initial opacity

    square.addEventListener("mouseover", function () {
      let currentOpacity = parseFloat(square.style.opacity);
      if (currentOpacity < 1) {
        currentOpacity += 0.1;
        square.style.opacity = currentOpacity;
      }
    });

    container.appendChild(square);
  }
}
