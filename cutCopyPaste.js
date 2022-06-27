

let isctrlKeyPressed = false;

document.addEventListener('keydown', (e) => {

    isctrlKeyPressed = e.ctrlKey;
})

document.addEventListener('keyup', (e) => {
    isctrlKeyPressed = (e.ctrlKey);
})

cellArr.forEach(cell => {
    cell.addEventListener('click', () => {
        handleSelection(cell)
    })
})
let selectedRange = []
function handleSelection(cell) {
    if (isctrlKeyPressed == false) {

        for (let i = selectedRange.length - 1; i >= 0; i--) {

            let rid = selectedRange[i][0]
            let cid = selectedRange[i][1]
            let prevCell = document.querySelector(`.cell[row = "${rid}"][col = "${cid}"]`)
            getProp(prevCell).border = '1px sloid black'
            prevCell.style.border = '1px solid black'
            selectedRange.pop();
            // console.log(selectedRange);
        }
        return;
    }

    if (selectedRange.length == 2) {

        let [rid, cid] = selectedRange.pop();

        let prevCell = document.querySelector(`.cell[row = "${rid}"][col = "${cid}"]`)
        getProp(prevCell).border = '1px sloid black'
        prevCell.style.border = '1px solid black'
        let prop = getProp(cell)
        cell.style.border = '3px solid rgb(65, 160, 128)';
        prop.border = '3px solid rgb(65, 160, 128)';
        update(cell);
        let row = cell.getAttribute('row')
        let col = cell.getAttribute('col')
        groupedPaste = true
        selectedRange.push([row, col])
        // console.log(selectedRange);
    }
    else {
        let prop = getProp(cell)
        cell.style.border = '3px solid rgb(65, 160, 128)';
        prop.border = '3px solid rgb(65, 160, 128)';
        update(cell);

        let row = cell.getAttribute('row')
        let col = cell.getAttribute('col')

        selectedRange.push([row, col])

        // console.log(selectedRange);

    }

}

// copy 
let clipBoard= []

copy.addEventListener('click', () => {
    if (selectedRange.length == 2) return
    activeCell.select();
    document.execCommand('copy')
})


copy.addEventListener('click', () => {
    if (selectedRange.length < 2) return
    clipBoard = []
    handleCopy();
})

document.addEventListener('keydown', (e) => {
    if (selectedRange.length < 2) return
    if (e.which == 67 && isctrlKeyPressed) {
        clipBoard = []
        isctrlKeyPressed = false
        handleCopy()
    }
})

function handleCopy() {
    if (selectedRange.length == 2) {


        let sr = selectedRange[0][0]
        let sc = selectedRange[0][1]
        let dr = selectedRange[1][0]
        let dc = selectedRange[1][1]


        for (let i = sr; i <= dr; i++) {
            let clipboardRow = []
            for (let j = sc; j <= dc; j++) {

                let copyFromCell = document.querySelector(`.cell[row = "${i}"][col = "${j}"]`)
                clipboardRow.push(copyFromCell.value)

                update(copyFromCell)
            }
            clipBoard.push(clipboardRow)
        }

    }
    else {
        handleSelection()
    }
}

paste.addEventListener('click', (e) => {


    if (clipBoard.length == 1) return;
    groupedPaste = true;


    handlePaste()


})

paste.addEventListener('click', () => {
    if (clipBoard.length > 1) return;
    navigator.clipboard.readText().then((clipText) => {
        activeCell.value = clipText;
        getProp(activeCell).value = activeCell.value
    });

})

function handlePaste(isCut) {

    if (clipBoard.length > 1) {



        for (let i = 0; i < clipBoard.length; i++) {
            for (let j = 0; j < clipBoard[0].length; j++) {
                let copyRow = Number(activeCell.getAttribute('row')) + (i);
                let copycol = Number(activeCell.getAttribute('col')) + (j);

                let cell = document.querySelector(`.cell[row = "${copyRow}"][col = "${copycol}"]`)


                let propCell = getProp(cell)

                propCell.value = clipBoard[i][j]
                cell.value = clipBoard[i][j]
                update(cell)
            }
        }




    }
}

// cut 

cut.addEventListener('click', () => {
    if (selectedRange.length > 1) return
    activeCell.select();
    document.execCommand('copy')
})


cut.addEventListener('click', () => {
    if (selectedRange.length < 2) return
    clipBoard = []
    handleCut();
})

document.addEventListener('keydown', (e) => {
    if (selectedRange.length < 2) return
    if (e.which == 67 && isctrlKeyPressed) {
        clipBoard = []
        isctrlKeyPressed = false
        handleCut()
    }
})

function handleCut() {
    if (selectedRange.length == 2) {


        let sr = selectedRange[0][0]
        let sc = selectedRange[0][1]
        let dr = selectedRange[1][0]
        let dc = selectedRange[1][1]


        for (let i = sr; i <= dr; i++) {
            let clipboardRow = []
            for (let j = sc; j <= dc; j++) {

                let cutFromCell = document.querySelector(`.cell[row = "${i}"][col = "${j}"]`)
                clipboardRow.push(cutFromCell.value)
                let prop = getProp(cutFromCell)
                prop.value = ''
                update(cutFromCell)
            }
            clipBoard.push(clipboardRow)
        }

    }
    else {
        handleSelection()
    }
}
