import React from 'react'
import CalcButton from './calcButton'
import {calculateAnswer} from '../modules/math'

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

    idGenerator(){
        let id = 0
        return () => {
            id++;
            return id;
        }
    }

    handleCalculation(){
        let answer = calculateAnswer(this.state.calcString)
        this.setState({
            solution:answer,
            solved: true
        })
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
                    <button onClick={() => {this.handleCalculation()}}>Calculate</button>
                </div>
                <div hidden={!this.state.solved}>
                    <h1> The solution to the problem is: {this.state.solution}</h1>
                </div>
            </div>
        )
    }
}

export default Calculator

