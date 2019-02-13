export const calculateAnswer = (equationStr) => {
    console.log(equationStr)
    let index1
    let parenCheck = true
    while(parenCheck){
        if((index1 = equationStr.indexOf('(')) !== -1){
            let closeIndex =  findEndingParenthesis(equationStr, index1)
            let parenString = equationStr.slice(index1+1, closeIndex)
            equationStr = equationStr.slice(0, index1) + calculateAnswer(parenString) + equationStr.slice(closeIndex, equationStr.length)
        }
        else{
            parenCheck = false;
        } 
    }
    let tree = calcTree(equationStr) 
    return solve(tree)
}

const operator = (node) => {
    switch(node.value){
        case '*':
            return solve(node.left) * solve(node.right)
        case '/':
            return solve(node.left) / solve(node.right)
        case '+':
            return solve(node.left) + solve(node.right)
        case '-':
            return solve(node.left) - solve(node.right)
        case '%':
            return solve(node.left) % solve(node.right)
        case '^':
            return toPower(solve(node.left),  solve(node.right))
        default:
            return 0
    }
}

const calcTree = (equationStr) => {
    if(!(equationStr.length > 0)){
        return
    }
    let symbols = ['+','-','^','*','/','%']
    for(let i = 0; i< symbols.length; i++){
        let index = equationStr.indexOf(symbols[i]);
        if((index !== -1)){
            let nextNode = new Node(equationStr.slice(index, index + 1))
            nextNode.left = calcTree(equationStr.slice(0, index))
            nextNode.right = calcTree(equationStr.slice(index + 1, equationStr.length))
            return nextNode
        }
    }
    return new Node(parseFloat(equationStr))
}

const solve = (node, val=0) => {
    if(node){
        if(isNumeric(node.value)){
            return node.value
        }
        else{
            return operator(node)
        }
    }
}

const isNumeric = (value) => {
    return !isNaN(value - parseFloat(value));
}

const toPower = (num, pow) => {
    if(pow > 1){
        pow--
        return(num * this.toPower(num, pow))         
    }
    return num
}

// const reverseIndexOf =(str, char) =>{
//     for(let i = (str.length - 1) ; i > 0 ; i--){
//         if(str.slice(i, i + 1) === char){
//             return i;
//         }
//     }
//     return -1;
// }

const findEndingParenthesis = (eqString, start) => {
    let opens = 0
    let closes = 0
    for(let i = start; i < eqString.length; i++){
        let char = eqString.slice(i, i+1)
        console.log(char)
        if(char === '('){
            opens++;
        }
        else if(char === ')'){
            closes++;
            if(opens === closes){
                return i;
            }
        }
    }
}

class Node{
    constructor(value, left = null, right = null){
        this.value = value
        this.left = left
        this.right = right
    }
}