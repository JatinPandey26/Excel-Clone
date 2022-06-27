
// when we leave a cell update value in properties
cellArr.forEach(cell => {
    cell.addEventListener('blur', (e) => {
        let prop = getProp(cell);
        prop.value = cell.value;
    })
})
// formula bar 
formulaBar.addEventListener('keypress', (e) => {
    let expression = formulaBar.value;
    if (e.key == 'Enter' && expression) {
        // resolving expression like A1 + 10 + B7
        let checkForValid = checkIfExpressionIsValidOrNot(expression);
        if(checkForValid == false){
            alert('Formula is not valid.')
            return;
        }
        if (getProp(activeCell).formula != "" && getProp(activeCell).formula != expression) {
            removeChildFromParent(getProp(activeCell).formula)
            removeChildFromGraph(getProp(activeCell).formula,address_block.value)
        }
        getProp(activeCell).formula = expression;
        addChildToGraph(expression,address_block.value);
        if(isGraphCyclic() == true){
            removeChildFromGraphToStopCycle(getProp(activeCell).formula,address_block.value);
            return;
        }
        addChildToParent(expression);
        expression = evaluateExpression(expression);
        // -------------
        activeCell.value = eval(expression);
        getProp(activeCell).value = activeCell.value
        updateValueForAllChilds(activeCell)
    }
})
function evaluateExpression(expression) {
    let expressionArr = expression.split(" ");
    for (let i = 0; i < expressionArr.length; i++) {
        let exp = expressionArr[i];
        if ((exp.charAt(0)).toLowerCase() !== (exp.charAt(0)).toUpperCase()) {
            let row = exp.substring(1) - 1;
            let col = (exp.substring(0, 1).charCodeAt(0)) - 65;
            let effective_value = document.querySelector(`.cell[row = "${row}"][col ="${col}"]`).value;
            if (effective_value != undefined) expressionArr[i] = effective_value;
            else expressionArr[i] = 0;
        }
    }
    // alert(expression)
    expression = expressionArr.join(' ');
    return expression;
}
function addChildToParent(expression) {
    let child = address_block.value;
    let expressionArr = expression.split(" ");
    for (let i = 0; i < expressionArr.length; i++) {
        let exp = expressionArr[i];
        if ((exp.charAt(0)).toLowerCase() !== (exp.charAt(0)).toUpperCase()) {
            let row = exp.substring(1) - 1;
            let col = (exp.substring(0, 1).charCodeAt(0)) - 65;
            let parent = document.querySelector(`.cell[row = "${row}"][col ="${col}"]`);
            let parentProp = getProp(parent);
            parentProp.children.push(child);
        }
    }
}
function removeChildFromParent(expression) {
    let child = address_block.value;
    let expressionArr = expression.split(" ");
    for (let i = 0; i < expressionArr.length; i++) {
        let exp = expressionArr[i];
        if ((exp.charAt(0)).toLowerCase() !== (exp.charAt(0)).toUpperCase()) {
            let row = exp.substring(1) - 1;
            let col = (exp.substring(0, 1).charCodeAt(0)) - 65;
            let parent = document.querySelector(`.cell[row = "${row}"][col ="${col}"]`);
            let parentProp = getProp(parent);
            parentProp.children = parentProp.children.filter(e => e != child)
        }
    }
}
cellArr.forEach(cell => {
    cell.addEventListener('input', (e) => {
            updateValueForAllChilds(cell);
            let prop = getProp(cell)
            prop.value = cell.value
    })
})
function updateValueForAllChilds(parent) {
    let childs = getProp(parent).children;
    childs.forEach(child => {
        // alert(child)
        let row = child.substring(1) - 1;
        let col = (child.substring(0, 1).charCodeAt(0)) - 65;
        let cell = document.querySelector(`.cell[row = "${row}"][col ="${col}"]`);
        let expression = getProp(cell).formula;
        expression = evaluateExpression(expression);
        // alert(expression)
        cell.value = eval(expression)
        updateValueForAllChilds(cell)
    })
}
function checkIfExpressionIsValidOrNot(expression){
    for(let i = 0 ; i < expression.length ; i++){
        let charCode = expression.charAt(i).charCodeAt(0);
        let mathematicalSymbolCode = [37 , 42 , 43 , 45 , 47]
        if((charCode >= 65 && charCode <= 90) || (charCode >= 48 && charCode <= 57) || (charCode == 32) || (mathematicalSymbolCode.includes(charCode))) {
        }
        else return false;
    }
    return true;
}