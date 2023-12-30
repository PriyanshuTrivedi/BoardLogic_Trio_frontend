import React from 'react'
import Sudoku3X3board from './Sudoku3X3board'

const Sudoku3X9row = (props) => {
    return (
        <div className='sudoku3X9row'>
            <Sudoku3X3board topLefti={props.topLefti} topLeftj={0}/>
            <Sudoku3X3board topLefti={props.topLefti} topLeftj={3}/>
            <Sudoku3X3board topLefti={props.topLefti} topLeftj={6}/>
        </div>
    )
}

export default Sudoku3X9row
