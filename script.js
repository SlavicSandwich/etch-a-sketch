const grid = document.querySelector('.grid-container');

for (let i = 0; i < 256; i++){
    grid_block = document.createElement('div');
    grid_block.classList.add('grid-block');
    grid.appendChild(grid_block);
}

function change_color(){
    this.style.backgroundColor = 'black';
}
const blocks = grid.querySelectorAll('.grid-block');
blocks.forEach((block)=>{block.addEventListener("mouseover", change_color)})