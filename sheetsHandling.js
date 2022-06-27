
let noOfSheets = 0;
let sheetsStorage = []
let graphStorage = []
let directedgraph = [];
let cellProperties = [];
let sheetsContainer = document.querySelector('.sheets_Container');
let sheetsArr = document.querySelector('.sheets');
let currentSheet ;

addSheetBtn.addEventListener('click',()=>{
    let element = document.createElement('div')
    noOfSheets += 1;
    element.setAttribute('class','sheets')
    element.setAttribute('sheetNo',noOfSheets)
    element.innerText = 'sheet ' + noOfSheets;
    sheetsContainer.appendChild(element) 
    createSheetDB()
    createGraphDB()
})


addSheetBtn.click()
function createSheetDB(){
    cellProperties = [];
for (let i = 1; i <= r; i++) {
    let propObject = [];
    for (let j = 1; j <= c; j++) {
        let props = {
            value: '',
            border: '',
            alignment: 'left',
            bold: false,
            italic: false,
            underline: false,
            text_color: '#000000',
            font: 'arial',
            size: '14',
            bgcolor: 'lightGrey',
            children : [],
            formula : "",
        }
        propObject.push(props);
    }
    cellProperties.push(propObject)
}
sheetsStorage.push(cellProperties);
// console.log(cellProperties);

updateSheet()
activeSheetHandler(noOfSheets-1)
}
function createGraphDB(){
     directedgraph = [];
for (let i = 1; i <= r; i++) {
    let row = [];
    for (let j = 1; j <= c; j++) {
        row.push([]);
    }
    directedgraph.push(row);
}
graphStorage.push(directedgraph)
// console.log(graphStorage);
}
function activeSheetHandler(sheetIdx){
    let sheet = document.querySelector(`.sheets[sheetNo = '${sheetIdx+1}']`)
    
    sheet.addEventListener('click',()=>{
        if(currentSheet != undefined){
            currentSheet.style.border = ""
        }
        currentSheet = sheet
        currentSheet.style.border = "2px solid black"
        activeSheet(sheet.getAttribute('sheetNo')-1)
    })
    sheet.click()
}
function activeSheet(sheetIdx){
cellProperties = sheetsStorage[sheetIdx]
directedgraph = graphStorage[sheetIdx]
updateSheet()
}
function updateSheet(){
    
    cellArr.forEach(cell => {
        cell.click();
    })
}
