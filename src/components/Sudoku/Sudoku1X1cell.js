import React, { useEffect } from 'react'
import { useContext } from 'react'
import { contextData } from '../../AllStates';

const Sudoku1X1cell = ({boxi,boxj}) => {
    const context=useContext(contextData);
    const onHoverCss=()=>{
        const el=document.getElementById(`cell${boxi},${boxj}`);
        if(context.sudokuDetails.solvableUniqueSudoku[boxi*9+boxj]==='.' && context.chosenDigitToFill!==0){
            el.style.cursor='pointer';
        }
        else{
            el.style.cursor='default';
        }
        let k,l,tempElHori,tempElVert,tempEl;
        for(k=0;k<9;k++){
            tempElHori=document.getElementById(`cell${boxi},${k}`);
            tempElVert=document.getElementById(`cell${k},${boxj}`);
            tempElHori.style.border='1px solid blue';
            tempElVert.style.border='1px solid blue';
        }
        for(k=Math.floor(boxi/3)*3;k<Math.floor(boxi/3)*3+3;k++){
            for(l=Math.floor(boxj/3)*3;l<Math.floor(boxj/3)*3+3;l++){
                tempEl=document.getElementById(`cell${k},${l}`);
                tempEl.style.border='1px solid blue';
            }
        }
    }
    const mouseOut=()=>{
        let k,l,tempEl,tempElHori,tempElVert;
        for(k=0;k<9;k++){
            tempElHori=document.getElementById(`cell${boxi},${k}`);
            tempElVert=document.getElementById(`cell${k},${boxj}`);
            tempElHori.style.border='1px solid black';
            tempElVert.style.border='1px solid black';
        }
        for(k=Math.floor(boxi/3)*3;k<Math.floor(boxi/3)*3+3;k++){
            for(l=Math.floor(boxj/3)*3;l<Math.floor(boxj/3)*3+3;l++){
                tempEl=document.getElementById(`cell${k},${l}`);
                tempEl.style.border='1px solid black';
            }
        }
    }
    const fillNumber=()=>{
        if(context.sudokuDetails.solvableUniqueSudoku[boxi*9+boxj]==='.'){
            console.log("Digit that is going to be filled is "+context.chosenDigitToFill);
            if(context.sudokuDetails.originalSudoku[boxi*9+boxj]===context.chosenDigitToFill.toString()){
                let tempSolvableSudoku={...context.sudokuDetails.solvableUniqueSudoku};
                let tempLeftNumberFreq={...context.sudokuDetails.leftNumberFreq};
                console.log(tempLeftNumberFreq);
                tempLeftNumberFreq[context.chosenDigitToFill]--;
                tempSolvableSudoku[boxi*9+boxj]=context.chosenDigitToFill.toString();
                const tempSudokuDetails={
                    originalSudoku:context.sudokuDetails.originalSudoku,
                    solvableUniqueSudoku:tempSolvableSudoku,
                    leftNumberFreq:tempLeftNumberFreq,
                    blanks:context.sudokuDetails.blanks-1
                }
                context.setSudokuDetails(tempSudokuDetails);
                console.log("successfully filled a box");
            }
            else{
                console.log(`you chose wrong digit, you chose ${context.chosenDigitToFill}, while correct is ${context.sudokuDetails.originalSudoku[boxi*9+boxj]}`);
                context.setFinalMsg(`You chose the wrong digit, you chose ${context.chosenDigitToFill}, while correct is ${context.sudokuDetails.originalSudoku[boxi*9+boxj]}. Better luck next time.`)
                context.setWrongAns(true);
            }
        }
        else{
            console.log(typeof(context.sudokuDetails.solvableUniqueSudoku[boxi*9+boxj]));
        }
    }
    return (
        <div className='sudoku1X1cell' id={`cell${boxi},${boxj}`} onMouseOver={onHoverCss} onMouseOut={mouseOut} onClick={fillNumber}>
            {context.sudokuDetails.solvableUniqueSudoku[boxi*9+boxj]}
        </div>
    )
}

export default Sudoku1X1cell;
