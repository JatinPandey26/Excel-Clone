let uploadBtn = document.querySelector('.upload')
let downloadBtn = document.querySelector('.download')

downloadBtn.addEventListener('click',()=>{
        let jsonData = JSON.stringify([sheetsStorage , graphStorage ]);
        let file = new Blob([jsonData],{type:"application/json"});

        
        let a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = "SheetData.json";
        a.click();
})

uploadBtn.addEventListener('click',()=>{
        let input = document.createElement('input');
        input.setAttribute('type','file');
        input.click();


        input.addEventListener('change',(e)=>{
                let fr = new FileReader();
                let files = input.files;
                let fileObj = files[0];

                fr.readAsText(fileObj);
                fr.addEventListener('load',()=>{
                        let readsheetData = JSON.parse(fr.result);

                        // make new sheet

                        addSheetBtn.click();

                        sheetsStorage[sheetsStorage.length-1] = readsheetData[0][0];
                        graphStorage[graphStorage.length-1] = readsheetData[1][0];


                        console.log(sheetsStorage);
                        console.log(graphStorage);
                        activeSheetHandler(sheetsStorage.length-1)
                        // activeSheet()/
                })
        })
})