let uploadBtn = document.querySelector('.upload')
let downloadBtn = document.querySelector('.download')

downloadBtn.addEventListener('click',()=>{
        let jsonData = JSON.stringify([sheetsStorage][graphStorage]);
        let file = new Blob([jsonData],{type:"application/json"});

        
        let a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = "SheetData.json";
        a.click;
})