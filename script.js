window.onload = (() => {
let rows = 100;
let cols = 26;

let col_address_bar = document.querySelector('.col_head');
let row_address_bar = document.querySelector('.row_address');
let cell_container = document.querySelector('.cell_cont');
let currCell;
let cell_loc;


for (let i = 0; i < rows; i++) {
    let new_block = document.createElement('div');
    new_block.innerText = i + 1;
    new_block.className = 'row_head row';
    row_address_bar.appendChild(new_block);
}

for (let i = 0; i < cols; i++) {
    let new_block = document.createElement('div');
    new_block.innerText = String.fromCharCode(65 + i);
    new_block.className = 'column_head column';
    col_address_bar.appendChild(new_block);
}

for (let i = 0; i < 26; i++) {
    let new_block = document.createElement('div');

    new_block.className = 'cell_row';
    
    for (let j = 0; j < 100; j++) {
        let new_block_col = document.createElement('input');
        new_block_col.className = 'column_head cell';

        new_block_col.setAttribute('row' , j);
        new_block_col.setAttribute('col',i);
        new_block_col.setAttribute('address', String.fromCharCode(65 + i) + (j + 1))
        new_block.appendChild(new_block_col);
    }
    cell_container.appendChild(new_block);
}

let cellArr = document.querySelectorAll('.cell');

cellArr.forEach((cell) => {
    cell.addEventListener('click', () => {
        let block_address = document.querySelector('.block_address');
        currCell = cell;
        let cell_row = cell.getAttribute('row');
        let cell_col = cell.getAttribute('col')
        cell_loc = {cell_row,cell_col};
        block_address.value = cell.getAttribute('address');
        
    })
})



})
