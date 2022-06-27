let XLSX = require('xlsx')

let uploadBtn = document.querySelector('.upload')
let downloadBtn = document.querySelector('download')

uploadBtn.addEventListener('click',()=>{
    let wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "SheetJS",
        Subject: "Test",
        Author: "Jatin Pandey",
        CreatedDate: new Date(2017,12,19)
};
for(let i = 0 ; i < sheetsStorage.length ; i++){
    let jsonData = json.stringify([sheetsStorage[i],[graphStorage[i]]])
    wb.SheetNames.push(`sheet ${i+1}`);
        var ws_data = jsonData;
        var ws = XLSX.utils.aoa_to_sheet(ws_data);
        wb.Sheets[`sheet ${i+1}`] = ws;
}

var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
        function s2ab(s) {
  
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
                
        }
        $("#button-a").click(function(){
                saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');
        });


})