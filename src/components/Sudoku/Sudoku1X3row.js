import React from 'react'
import Sudoku1X1cell from './Sudoku1X1cell' 

const Sudoku1X3row = (props) => {
    return (
        <div className='sudoku1X3row'>
            <Sudoku1X1cell boxi={props.topLefti} boxj={props.topLeftj}/>
            <Sudoku1X1cell boxi={props.topLefti} boxj={props.topLeftj+1}/>
            <Sudoku1X1cell boxi={props.topLefti} boxj={props.topLeftj+2}/>
        </div>
    )
}

export default Sudoku1X3row
