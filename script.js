function reset_grid() {
  const blocks = grid.querySelectorAll(".grid-block");
  blocks.forEach((block) => reset_color(block));
}

function reset_color(block) {
  block.style.backgroundColor = "white";
}

function change_color() {
  if (random)this.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
  else this.style.backgroundColor = colorpicker.value;
}


function create_grid(n) {
  grid.innerHTML = "";
  grid_size = window.getComputedStyle(grid).getPropertyValue("min-height");
  grid_size = +grid_size.slice(0, grid_size.indexOf("px"));
  for (let i = 0; i < n * n; i++) {
    grid_block = document.createElement("div");
    grid_block.classList.add("grid-block");
    grid_block.style.minWidth = `${grid_size / n}px`;
    grid_block.style.minHeight = `${grid_size / n}px`;

    grid_block.style.maxWidth = `${grid_size / n}px`;
    grid_block.style.maxHeight = `${grid_size / n}px`;

    grid.appendChild(grid_block);
  }
  const blocks = grid.querySelectorAll(".grid-block");
  blocks.forEach((block) => {
    block.addEventListener("mouseover", change_color);
  });
}

function change_grid() {
  val = +prompt("How big is grid?");
  console.log(val);
  if (val > 1 && val < 100) {
    create_grid(val);
  }
}


let random = false;

const grid = document.querySelector(".grid-container");
create_grid(16);
const colorpicker = document.querySelector("#colorpicker");

const restart = document.querySelector(".restart");
restart.addEventListener("click", reset_grid);

const grid_changer = document.querySelector(".grid-change");
grid_changer.addEventListener("click", change_grid);

const random_mode = document.querySelector(".random-mode");
random_mode.addEventListener("click", ()=>{random=!random});
