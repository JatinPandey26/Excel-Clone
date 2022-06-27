function addChildToGraph(expression, address) {
    let expressionArr = expression.split(" ");
    for (let i = 0; i < expressionArr.length; i++) {
        let exp = expressionArr[i];
        if ((exp.charAt(0)).toLowerCase() !== (exp.charAt(0)).toUpperCase()) {
            let [prid, pcid] = getrowcolId(exp);
            directedgraph[prid][pcid].push(getrowcolId(address));
        }
    }
    // console.log(directedgraph);
}
function removeChildFromGraph(expression, address) {
    let expressionArr = expression.split(" ");
    for (let i = 0; i < expressionArr.length; i++) {
        let exp = expressionArr[i];
        if ((exp.charAt(0)).toLowerCase() !== (exp.charAt(0)).toUpperCase()) {
            let [prid, pcid] = getrowcolId(exp);
            let [crid, ccid] = getrowcolId(address);
            for (let i = 0; i < directedgraph[prid][pcid].length; i++) {
                if (directedgraph[prid][pcid][i][0] == crid && directedgraph[prid][pcid][i][1] == ccid) {
                    directedgraph[prid][pcid].splice(i, 1);
                }
            }
        }
    }
}
function getrowcolId(exp) {
    let row = exp.substring(1) - 1;
    let col = (exp.substring(0, 1).charCodeAt(0)) - 65;
    return [row, col];
}
function removeChildFromGraphToStopCycle(expression, address) {
    let expressionArr = expression.split(" ");
    for (let i = 0; i < expressionArr.length; i++) {
        let exp = expressionArr[i];
        if ((exp.charAt(0)).toLowerCase() !== (exp.charAt(0)).toUpperCase()) {
            let [prid, pcid] = getrowcolId(exp);
            directedgraph[prid][pcid].pop();
        }
    }
}
let path = [];
function isGraphCyclic() {
    let visited = []
    let dfsvisited = []
    for (let i = 1; i <= r; i++) {
        let visitedrow = [];
        let dfsvisitedrow = [];
        for (let j = 1; j <= c; j++) {
            visitedrow.push(false);
            dfsvisitedrow.push(false);
        }
        visited.push(visitedrow);
        dfsvisited.push(dfsvisitedrow);
    }
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (visited[i][j] == false) {
                let check = dfsCycleDetection(visited, dfsvisited, i, j,path);
                if (check == true){
                    let response = confirm("Your formula contains cyclic dependencies. Do you want to print the path ?");
                    if(response) {
                        tracePathofCycle(path);
                        console.log(path);
                    }
                    return true;
                } 
            }
        }
    }
}
function dfsCycleDetection(visited, dfsvisited, row, col,path) {
    if (directedgraph[row][col].length == 0) return false;
    path.push([row , col]);
    visited[row][col] = true;
    dfsvisited[row][col] = true;
    for (let i = 0; i < directedgraph[row][col].length; i++) {
        let nrow = directedgraph[row][col][i][0];
        let ncol = directedgraph[row][col][i][1];
        if (visited[nrow][ncol] == false) {
            let check = dfsCycleDetection(visited, dfsvisited, nrow, ncol , path);
            if (check == true) return true;
        }
        else if (visited[nrow][ncol] == true && dfsvisited[nrow][ncol] == true) {
            path.push([nrow,ncol])
            return true;
        }
    }
    dfsvisited[row][col] = false;
    path.pop()
    return false;
}
let cycleMarkedOnSheet = false
 function tracePathofCycle(path){
    cycleMarkedOnSheet = true;
    colorThePath(path);
}
  function colorThePath(path){
    for(let i = 0 ; i < path.length ; i++){
        let row = path[i][0];
        let col = path[i][1];
        let cell = document.querySelector(`.cell[row = "${row}"][col = "${col}"]`)
        let prop = getProp(cell)
        prop.border = "2px solid red"
        update(cell)  
    }
} 
// resetting the line 
cellArr.forEach(cell => {
    cell.addEventListener('click',()=>{
        if(cycleMarkedOnSheet){
            for(let i = 0 ; i < path.length ; i++){
                let row = path[i][0];
                let col = path[i][1];
                let cell = document.querySelector(`.cell[row = "${row}"][col = "${col}"]`)
                let prop = getProp(cell)
                prop.border = "1px solid black"
                update(cell)  
            }
            cycleMarkedOnSheet = false
        }
    })
})