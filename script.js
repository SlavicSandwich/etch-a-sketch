function reset_grid() {
  let blocks = grid.querySelectorAll(".grid-block");
  blocks.forEach((block) => reset_color(block));
}

function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1)"
    );
  }
  throw new Error("Bad Hex");
}

function reset_color(block) {
  block.dataset.darken = 0;
  block.style.backgroundColor = "white";
}

function darken(e) {
  let pickedColor = hexToRgbA(colorpicker.value);
  let pickedString = pickedColor.slice(5, -1);
  let pickedArr = pickedString.split(",");

  let oldColor = e.target.style.backgroundColor;
  let rgbaString = oldColor.charAt(3) == "a" ? oldColor.slice(5, -1) : oldColor.slice(4, -1);
  let rgbaArr = rgbaString.split(",");

  let newRed;
  let newGreen;
  let newBlue;
  let newAlpha;
  if (
    rgbaArr.length == 1 ||
    pickedArr[0] != rgbaArr[0].trim() ||
    pickedArr[1] != rgbaArr[1].trim() ||
    pickedArr[2] != rgbaArr[2].trim()
  ) {
    e.target.dataset.darken = 0;
    newRed = pickedArr[0];
    newGreen = pickedArr[1];
    newBlue = pickedArr[2];
    newAlpha = getDarkerColor(0, e.target.dataset.darken);
  } else {
    let alpha = rgbaArr[3] ? rgbaArr[3] : 1;
    newRed = rgbaArr[0];
    newGreen = rgbaArr[1];
    newBlue = rgbaArr[2];
    newAlpha = getDarkerColor(alpha, e.target.dataset.darken);
  }

  e.target.dataset.darken++;
  e.target.style.backgroundColor = `rgba(${newRed}, ${newGreen}, ${newBlue}, ${newAlpha})`;
}

function getDarkerColor(cur, step) {
  let increment;
  let newValue;
  increment = (1 - cur) / (10 - step);
  newValue = +cur + increment;
  return newValue;
}

function change_color(e) {
  if (e.type === "mouseover" && !active) return;
  e.preventDefault();
  if (random)
    e.target.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  else if (opacity) darken(e);
  else e.target.style.backgroundColor = colorpicker.value;
}

function create_grid(n) {
  grid.innerHTML = "";
  let grid_size = window.getComputedStyle(grid).getPropertyValue("min-height");
  grid_size = +grid_size.slice(0, grid_size.indexOf("px"));
  for (let i = 0; i < n * n; i++) {
    grid_block = document.createElement("div");
    grid_block.dataset.darken = 0;
    grid_block.classList.add("grid-block");
    grid_block.style.minWidth = `${grid_size / n}px`;
    grid_block.style.minHeight = `${grid_size / n}px`;

    grid_block.style.maxWidth = `${grid_size / n}px`;
    grid_block.style.maxHeight = `${grid_size / n}px`;

    grid.appendChild(grid_block);
  }
  let blocks = grid.querySelectorAll(".grid-block");
  blocks.forEach((block) => {
    block.addEventListener("mouseover", change_color);
    block.addEventListener("mousedown", change_color);
  });
}

function change_grid() {
  let val = +prompt("How big is grid?");
  console.log(val);
  if (val > 1 && val < 100) {
    create_grid(val);
  }
}

let random = false;
let opacity = false;
let active = false;

document.body.onmousedown = () => (active = true);
document.body.onmouseup = () => (active = false);

const grid = document.querySelector(".grid-container");
create_grid(16);
const colorpicker = document.querySelector("#colorpicker");

const restart = document.querySelector(".restart");
restart.addEventListener("click", reset_grid);

const grid_changer = document.querySelector(".grid-change");
grid_changer.addEventListener("click", change_grid);

const random_mode = document.querySelector(".random-mode");
random_mode.addEventListener("click", () => {
  random = !random;
  opacity = false;
});

const opacity_mode = document.querySelector(".opacity-mode");
opacity_mode.addEventListener("click", () => {
  opacity = !opacity;
  random = false;
});
