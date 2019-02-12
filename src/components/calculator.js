import React from 'react'
import CalcButton from './calcButton'

class Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            calcString: '',
            solved: false,
            solution: ''
        }
        this.handleCalcButton = this.handleCalcButton.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleCalcButton(c){
        this.setState({
            calcString: this.state.calcString + c
        })
    }

    handleChange(e){
        this.setState({
            calcString: e.target.value
        })
    }

    calculateAnswer(){
        // Uses a tree to solve the problem
        const equationTree = this.calcTree(this.state.calcString)
        const sol = this.solve(equationTree)
        this.setState({
            solved:true,
            solution: sol
        })
    }

    calcTree(equationStr){
        console.log(equationStr)
        if(!(equationStr.length > 0)){
            return
        }

        let symbols = ['+','-','^','*','/','%']
        for(let i = 0; i< symbols.length; i++){
            let index = equationStr.indexOf(symbols[i]);
            if((index !== -1)){
                let nextNode = new Node(equationStr.slice(index, index + 1))
                nextNode.left = this.calcTree(equationStr.slice(0, index))
                nextNode.right = this.calcTree(equationStr.slice(index + 1, equationStr.length))
                console.log(nextNode)
                return nextNode
            }
        }
        return new Node(parseFloat(equationStr))
    }

    solve(node, val=0){
        if(node){
            console.log(node.value)
            if(this.isNumeric(node.value)){
                return node.value
            }
            else{
                switch(node.value){
                    case '*':
                        return this.solve(node.left) * this.solve(node.right)
                    case '/':
                        return this.solve(node.left) / this.solve(node.right)
                    case '+':
                        return this.solve(node.left) + this.solve(node.right)
                    case '-':
                        return this.solve(node.left) - this.solve(node.right)
                    case '%':
                        return this.solve(node.left) % this.solve(node.right)
                    case '^':
                        return this.toPower(this.solve(node.left),  this.solve(node.right))
                    default:
                        return 0
                }
            }
        }
    }

    isNumeric(value){
        return !isNaN(value - parseFloat(value));
    }

    toPower(num, pow){
        if(pow > 1){
            pow--
            return(num * this.toPower(num, pow))         
        }
        return num
    }

    idGenerator(){
        let id = 0
        return () => {
            id++;
            return id;
        }
    }

    render(){
        const buttons = ['+','-','*','/','%']
        const getId = this.idGenerator()
        const buttonElements = buttons.map(b => 
            <CalcButton key={getId()} name={b} handleCalcButton={this.handleCalcButton}></CalcButton>
        )
        return(
            <div className="calculator">
                <div>
                    <input type="text" value={this.state.calcString} onChange={this.handleChange}></input>
                </div>
                <div>
                    {buttonElements}
                </div>
                <div>
                    <button onClick={() => {this.calculateAnswer()}}>Calculate</button>
                </div>
                <div hidden={!this.state.solved}>
                    <h1> The solution to the problem is: {this.state.solution}</h1>
                </div>
            </div>
        )
    }
}

export default Calculator

class Node{
    constructor(value, left = null, right = null){
        this.value = value
        this.left = left
        this.right = right
    }
}