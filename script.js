const grid = document.querySelector('.grid-container');
const restart = document.querySelector('.restart');
restart.addEventListener('click', reset_grid)


for (let i = 0; i < 256; i++){
    grid_block = document.createElement('div');
    grid_block.classList.add('grid-block');
    grid.appendChild(grid_block);
}

function reset_grid(){
    const blocks = grid.querySelectorAll('.grid-block');
    blocks.forEach((block)=>(reset_color(block)))
}

function reset_color(block){
    block.style.backgroundColor = 'white';
}

function change_color(){
    this.style.backgroundColor = 'black';
}
const blocks = grid.querySelectorAll('.grid-block');
blocks.forEach((block)=>{block.addEventListener("mouseover", change_color)})