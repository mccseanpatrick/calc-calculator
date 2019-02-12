import React from 'react'

// JSX Component for a calc button

const CalcButton = ({name, handleCalcButton}) => {
    return(<button type="submit" onClick={ () => handleCalcButton(name)}>{name}</button>)
}

export default CalcButton