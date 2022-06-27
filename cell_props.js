

    let currCell;

    let rows = 100;
    let cols = 26;

    let cellProperty = [];

    for (let c = 0; c < cols; c++) {

        let coloumn = [];

        for (let r = 0; r < rows; r++) {
            let cellProp = {
                bold: false,
                italic: false,
                underline: false,
                alignment: 'left',
                textColor: '#000000',
                BgColor: '0',
                font: 1,
                fontSize: '14',
                border : ''
            }
            coloumn.push(cellProp);
        }

        cellProperty.push(coloumn);


    }

    // let address = document.querySelector('.block_address')
    let cut = document.querySelector('.cut')
    let copy = document.querySelector('.copy')
    let clipboard = document.querySelector('.clipboard')
    let font = document.querySelector('.font')
    let size = document.querySelector('.size')
    let bold = document.querySelector('.bold')
    let italic = document.querySelector('.italic')
    let underline = document.querySelector('.underline')
    let left_align = document.querySelector('.align-left')
    let right_align = document.querySelector('.align-right')
    let center_align = document.querySelector('.align-justify')
    let text_color_input = document.querySelector('.text_color_input')
    let color_fill_input = document.querySelector('.color_fill_input')


    let fontArr = ['arial','serif','cursive']

    let activeOptionColor = '#009099'
    let deactiveOptionColor = '#099842'




    function update(cell) {
        let props = cellProperty[cell.getAttribute('row')][cell.getAttribute('col')];
        bold.style.backgroundColor = deactiveOptionColor;
        italic.style.backgroundColor = deactiveOptionColor;
        underline.style.backgroundColor = deactiveOptionColor;
        if (props.bold){
            cell.style.fontWeight = 'bold';
            bold.style.backgroundColor = activeOptionColor;
        } 
        if (props.italic){
            cell.style.fontStyle = 'italic'
            italic.style.backgroundColor = activeOptionColor;
        } 
        if (props.underline){
            cell.style.textDecoration = "underline"
            underline.style.backgroundColor = activeOptionColor;
        }
        if (props.alignment == 'left') {
            cell.style.textAlign = "left";
            left_align.style.backgroundColor = activeOptionColor;
            right_align.style.backgroundColor = deactiveOptionColor;
            center_align.style.backgroundColor = deactiveOptionColor;
        }
        if (props.alignment == 'center') {
            
            cell.style.textAlign = "center";
            left_align.style.backgroundColor = deactiveOptionColor;
            right_align.style.backgroundColor = deactiveOptionColor;
            center_align.style.backgroundColor = activeOptionColor;
        }
        if (props.alignment == 'right') {
            cell.style.textAlign = "right";
            left_align.style.backgroundColor = deactiveOptionColor;
            right_align.style.backgroundColor = activeOptionColor;
            center_align.style.backgroundColor = deactiveOptionColor;
        }
        size.value = props.fontSize;
        font.selectedIndex = props.font;
        cell.style.fontFamily  = fontArr[props.font]
        cell.style.fontSize = props.fontSize + 'px';
        cell.style.fontFamily = props.font;
        cell.style.color = props.textColor;
        cell.style.backgroundColor = props.BgColor;
        cell.style.border = props.border;
    }


    left_align.addEventListener('click', () => {
        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;
        let cellArr = document.querySelectorAll('.cell');
        cellArr.forEach((cell) => {
            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {

                let props = cellProperty[cell_row][cell_col];
                props.alignment = 'left';
                update(cell);

            };
        })
    })

    right_align.addEventListener('click', () => {
        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;
        let cellArr = document.querySelectorAll('.cell');
        cellArr.forEach((cell) => {
            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {

                let props = cellProperty[cell_row][cell_col];
                props.alignment = 'right';
                update(cell);

            };
        })
    })

    center_align.addEventListener('click', () => {
        
        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;
        let cellArr = document.querySelectorAll('.cell');
        cellArr.forEach((cell) => {
            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {

                let props = cellProperty[cell_row][cell_col];
                props.alignment = 'center';
                update(cell);

            };
        })
    })


    bold.addEventListener('click', () => {
        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;
        let cellArr = document.querySelectorAll('.cell');
        cellArr.forEach((cell) => {
            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {

                let props = cellProperty[cell_row][cell_col];
                props.bold = true;
                update(cell);

            };
        })
    })

    italic.addEventListener('click', () => {
        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;
        let cellArr = document.querySelectorAll('.cell');
        cellArr.forEach((cell) => {
            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {

                let props = cellProperty[cell_row][cell_col];
                props.italic = true;
                update(cell);

            };
        })
    })

    underline.addEventListener('click', () => {
        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;
        let cellArr = document.querySelectorAll('.cell');
        cellArr.forEach((cell) => {
            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {

                let props = cellProperty[cell_row][cell_col];
                props.underline = true;
                update(cell);

            };
        })
    })


    cut.addEventListener('click', () => {

        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;

        let cellArr = document.querySelectorAll('.cell');

        cellArr.forEach((cell) => {


            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {

                cell.select();
                document.execCommand('copy');

                // navigator.clipboard.writeText(cell.value)

                // let test = navigator.clipboard.readText();
                // alert(test)
                // alert(cell.getAttribute('row') + " " + cell_row + " & " + cell.getAttribute('col') + "  " + cell_col  )
                cell.value = "";
            };



        })

    })



    copy.addEventListener('click', () => {
        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;
        let cellArr = document.querySelectorAll('.cell');
        cellArr.forEach((cell) => {
            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {

                cell.select();
                document.execCommand('copy');

            };
        })
    })

    size.addEventListener('click', () => {
        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;
        let cellArr = document.querySelectorAll('.cell');
        let fontsize = size.value;
        cellArr.forEach((cell) => {
            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {

                let props = cellProperty[cell_row][cell_col];
                props.fontSize = fontsize;
                update(cell);

            };
        })
    })

    font.addEventListener('change', () => {
        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;
        let cellArr = document.querySelectorAll('.cell');
        let fontfamily = font.selectedIndex;
        cellArr.forEach((cell) => {
            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {

                let props = cellProperty[cell_row][cell_col];
                
                props.font = fontfamily;
                
                update(cell);

            };
        })
    })


    text_color_input.addEventListener('change', () => {
        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;
        let cellArr = document.querySelectorAll('.cell');


        let props = cellProperty[cell_row][cell_col];
        props.textColor = text_color_input.value;
        
         
        cellArr.forEach((cell) => {
            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {
                update(cell);

            };
        })
    })
    
    color_fill_input.addEventListener('change', () => {
        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;
        let cellArr = document.querySelectorAll('.cell');

       
                let props = cellProperty[cell_row][cell_col];
                props.BgColor = color_fill_input.value;
          
        
        

        cellArr.forEach((cell) => {
            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {
                
                update(cell);

            };
        })
    })

    let cell_address = document.querySelector('.block_address');

    cell_address.addEventListener('change',()=>{
        let address = document.querySelector('.block_address').value;
        let cell_col = address.substring(0, 1).charCodeAt(0) - 65;
        let cell_row = parseInt(address.substring(1)) - 1;
        let cellArr = document.querySelectorAll('.cell');

        cellArr.forEach((cell) => {
            if (cell.getAttribute('row') == cell_row && cell.getAttribute('col') == cell_col) {
                
                cell.click();

            };
        })
    })



    
    let cellArr = document.querySelectorAll('.cell');
    
    cellArr.forEach((cell) => {
        cell.addEventListener('click', () => {
            if(currCell != undefined){
                currCell.style.border = "";
            cellProperty[currCell.getAttribute('row')][currCell.getAttribute('col')] = '';
            update(currCell);
        }
            
            currCell = cell;
            cellProperty[currCell.getAttribute('row')][currCell.getAttribute('col')] = '2px solid black';
            currCell.style.border = "2px solid black"
            alert('dhadha')
         update(cell)
        })
    })


    





    
