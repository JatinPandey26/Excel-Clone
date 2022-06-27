JS ->

cloneScript.js ->

Created Grid using JS 
Storing Properties in a 2d matrix as Grid
maintaining a update function which update all the things according to prop of a cell
UpdateToolBar -> it update tool bar according to activeCell
Some eventListners for functionalities
Update Address block according to activeCell
if we change address in address block then go to that cell 

formula_bar.js ->

if we enter any formula in formula bar then first resolve it (A1 + 10 -> value at A + 10 )
then eval(expression) to get ans and store it in activeCell.

maitiain a parent-child relation c1 = A1 + 10 -> store c1 as children in A1-> Properties
we are doing this so that if a expression chnage or value of any element changes so we can update all childrens through updateValueForAllChilds .
we are calling it when we left a cell using blur

