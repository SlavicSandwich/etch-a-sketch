function reset_grid() {
  const blocks = grid.querySelectorAll(".grid-block");
  blocks.forEach((block) => reset_color(block));
}

function reset_color(block) {
  block.style.backgroundColor = "white";
}

function change_color(color) {
  this.style.backgroundColor = colorpicker.value;
}

const grid = document.querySelector(".grid-container");
for (let i = 0; i < 256; i++) {
  grid_block = document.createElement("div");
  grid_block.classList.add("grid-block");
  grid.appendChild(grid_block);
}
const colorpicker = document.querySelector("#colorpicker");
const blocks = grid.querySelectorAll(".grid-block");
blocks.forEach((block) => {
  block.addEventListener("mouseover", change_color);
});

const restart = document.querySelector(".restart");
restart.addEventListener("click", reset_grid);


