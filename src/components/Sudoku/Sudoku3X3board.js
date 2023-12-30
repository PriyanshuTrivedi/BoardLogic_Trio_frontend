import React from 'react'
import Sudoku1X3row from './Sudoku1X3row'

const Sudoku3X3board = (props) => {
    return (
        <div className='sudoku3X3board'>
            <Sudoku1X3row topLefti={props.topLefti} topLeftj={props.topLeftj}/>
            <Sudoku1X3row topLefti={props.topLefti+1} topLeftj={props.topLeftj}/>
            <Sudoku1X3row topLefti={props.topLefti+2} topLeftj={props.topLeftj}/>
        </div>
    )
}

export default Sudoku3X3board
