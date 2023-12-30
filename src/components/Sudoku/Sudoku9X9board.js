import React from 'react'
import Sudoku3X9row from './Sudoku3X9row'

const Sudoku9X9board = () => {
    return (
        <div className='sudoku9X9board'>
            <Sudoku3X9row topLefti={0}/>
            <Sudoku3X9row topLefti={3}/>
            <Sudoku3X9row topLefti={6}/>
        </div>
    )
}

export default Sudoku9X9board
