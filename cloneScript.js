let r = 100
let c = 26

let row_label = document.querySelector('.row_label');
let col_label = document.querySelector('.col_label');
let cells_container = document.querySelector('.cells_container')
let block_address = document.querySelector('.block_address');
let cut = document.querySelector('.cut')
let copy = document.querySelector('.copy')
let paste = document.querySelector('.paste')
let font = document.querySelector('.font');
let size = document.querySelector('.size');
let bold = document.querySelector('.bold');
let italic = document.querySelector('.italic');
let underline = document.querySelector('.underline');
let leftAlign = document.querySelector('.align-left');
let rightAlign = document.querySelector('.align-right')
let centerAlign = document.querySelector('.align-justify')
let text_color = document.querySelector('.text_color_input');
let color_fill = document.querySelector('.color_fill_input');
let address_block = document.querySelector('.block_address');
let formulaBar = document.querySelector('.formula_block'); let activeCell;
let fonts = ['arial', 'sheriff', 'cursive']
let sizes = ['14', '16', '18'];
let addSheetBtn = document.querySelectorAll('.add_sheets')[0];
let groupedPaste = false;


for (let i = 1; i <= r; i++) {
    let child = document.createElement('div');
    child.setAttribute('class', 'row_label_element');
    child.innerText = i;
    row_label.appendChild(child);
}
for (let j = 1; j <= c; j++) {
    let childcol = document.createElement('div');
    childcol.setAttribute('class', 'col_label_element');
    childcol.innerText = String.fromCharCode(65 + j - 1);
    col_label.appendChild(childcol);
}
// adding rows
for (let i = 1; i <= r; i++) {
    let child = document.createElement('div');
    child.setAttribute('class', 'cell_element_row');
    // adding cols
    for (let j = 1; j <= c; j++) {
        let childcol = document.createElement('input');
        childcol.setAttribute('class', 'cell_element_col cell');
        childcol.setAttribute('row', i - 1)
        childcol.setAttribute('col', j - 1)
        child.appendChild(childcol);
    }
    cells_container.appendChild(child);
}
let cellArr = document.querySelectorAll('.cell');
let firstcell = cellArr[0]
firstcell.click()
function getProp(cell) {
    let prop = cellProperties[cell.getAttribute('row')][cell.getAttribute('col')];
    return prop;
}
function update(cell) {
    let prop = getProp(cell);
    // cell.style.border = prop.border;
    cell.style.fontFamily = prop.font;
    cell.style.fontSize = prop.size + "px";
    if (prop.bold) cell.style.fontWeight = 'bold'
    else cell.style.fontWeight = 'normal'
    if (prop.italic) cell.style.fontStyle = 'italic'
    else cell.style.fontStyle = 'normal'
    if (prop.underline) cell.style.textDecoration = 'underline'
    else cell.style.textDecoration = 'none'
    // alignment
    cell.style.textAlign = prop.alignment
    // text color
    cell.style.color = prop.text_color
    //bgcolor
    cell.style.backgroundColor = prop.bgcolor
    //function bar
    formulaBar.value = prop.formula;
    cell.value = prop.value
}
function updateToolbar() {
    if (getProp(activeCell).font == 'arial') font.selectedIndex = 0;
    else if (getProp(activeCell).font == 'sheriff') font.selectedIndex = 1;
    else if (getProp(activeCell).font == 'cursive') font.selectedIndex = 2;
    if (bold.getAttribute('active') == 'true') bold.style.backgroundColor = '#ced6e0'
    else bold.style.backgroundColor = '#dfe4ea'
    if (italic.getAttribute('active') == 'true') italic.style.backgroundColor = '#ced6e0'
    else italic.style.backgroundColor = '#dfe4ea'
    if (underline.getAttribute('active') == 'true') underline.style.backgroundColor = '#ced6e0'
    else underline.style.backgroundColor = '#dfe4ea'
    if (leftAlign.getAttribute('active') == 'true') {
        leftAlign.style.backgroundColor = '#ced6e0'
        rightAlign.style.backgroundColor = '#dfe4ea'
        centerAlign.style.backgroundColor = '#dfe4ea'
    }
    else if (rightAlign.getAttribute('active') == 'true') {
        leftAlign.style.backgroundColor = '#dfe4ea'
        rightAlign.style.backgroundColor = '#ced6e0'
        centerAlign.style.backgroundColor = '#dfe4ea'
    }
    else if (centerAlign.getAttribute('active') == 'true') {
        leftAlign.style.backgroundColor = '#dfe4ea'
        rightAlign.style.backgroundColor = '#dfe4ea'
        centerAlign.style.backgroundColor = '#ced6e0'
    }
}
cellArr.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (activeCell != undefined) {
            let prop = getProp(activeCell);
            activeCell.style.border = prop.border
            update(activeCell)
        }
        activeCell = cell;
        let col = parseInt(cell.getAttribute('col'));
        let row = parseInt(cell.getAttribute('row')) + 1;
        let colalpha = String.fromCharCode(65 + col);
        let address = colalpha + row;
        let prop = getProp(activeCell);
        activeCell.style.border = '2px black solid'
        block_address.value = address;
        updateToolbar();
        update(activeCell);
    })
})



font.addEventListener('change', () => {
    let prop = getProp(activeCell);
    prop.font = fonts[font.selectedIndex];
    update(activeCell);
})
size.addEventListener('change', () => {
    let prop = getProp(activeCell);
    prop.size = sizes[size.selectedIndex];
    update(activeCell);
})
bold.addEventListener('click', () => {
    let prop = getProp(activeCell)
    if (bold.getAttribute('active') == 'false') {
        prop.bold = true
        bold.setAttribute('active', 'true');
    }
    else {
        prop.bold = false
        bold.setAttribute('active', 'false');
    }
    updateToolbar()
    update(activeCell);
})
italic.addEventListener('click', () => {
    let prop = getProp(activeCell)
    if (italic.getAttribute('active') == 'false') {
        prop.italic = true
        italic.setAttribute('active', 'true');
    }
    else {
        prop.italic = false
        italic.setAttribute('active', 'false');
    }
    updateToolbar()
    update(activeCell);
})
underline.addEventListener('click', () => {
    let prop = getProp(activeCell)
    if (underline.getAttribute('active') == 'false') {
        prop.underline = true
        underline.setAttribute('active', 'true');
    }
    else {
        prop.underline = false
        underline.setAttribute('active', 'false');
    }
    updateToolbar()
    update(activeCell);
})
leftAlign.addEventListener('click', () => {
    let prop = getProp(activeCell)
    prop.alignment = 'left'
    leftAlign.setAttribute('active', 'true')
    rightAlign.setAttribute('active', 'false')
    centerAlign.setAttribute('active', 'false')
    updateToolbar()
    update(activeCell);
})
rightAlign.addEventListener('click', () => {
    let prop = getProp(activeCell)
    prop.alignment = 'right'
    leftAlign.setAttribute('active', 'false')
    rightAlign.setAttribute('active', 'true')
    centerAlign.setAttribute('active', 'false')
    updateToolbar()
    update(activeCell);
})
centerAlign.addEventListener('click', () => {
    let prop = getProp(activeCell)
    prop.alignment = 'center'
    leftAlign.setAttribute('active', 'false')
    rightAlign.setAttribute('active', 'false')
    centerAlign.setAttribute('active', 'true')
    updateToolbar()
    update(activeCell);
})
text_color.addEventListener('change', () => {
    let prop = getProp(activeCell)
    prop.text_color = text_color.value + "";
    update(activeCell)
})
color_fill.addEventListener('change', () => {
    let prop = getProp(activeCell)
    prop.bgcolor = color_fill.value + "";
    update(activeCell)
})
// Function Bar
// implementing so that if i write address in address block and press enter it will click on selected cell 
address_block.addEventListener('change', () => {
    let address = address_block.value;
    let row = address.substring(1) - 1;
    let col = (address.substring(0, 1).charCodeAt(0)) - 65;
    let cellArr = document.querySelectorAll('.cell');
    cellArr.forEach(cell => {
        if (cell.getAttribute('row') == row && cell.getAttribute('col') == col) {
            cell.click()
        }
    })
})
