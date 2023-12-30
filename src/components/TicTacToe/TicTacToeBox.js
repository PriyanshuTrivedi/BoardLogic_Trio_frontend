import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import { CheckIfGameEnded } from './CheckIfGameEnded';
import MoveHistoryBox from '../DotAndBoxes/MoveHistoryBox';

const TicTacToeBox = ({i,j}) => {
    const context=useContext(contextData);
    const {playerName,diff,ticTacToeBoard,setTicTacToeBoard,compChance,setCompChance,gameEnded,setGameEnded,winner,setWinner,moveDetails,setMoveDetails}=context;

    const userTakesChance=()=>{
        let n=3;
        let tempBoard=[];
        for(let k=0;k<n;k++){
            let tempArr=[...ticTacToeBoard[k]];
            tempBoard.push(tempArr);
        }
        tempBoard[i][j]=-1;
        setTicTacToeBoard(tempBoard);
        const box={
            row:i,
            column:j
        }
        updateMoveHistory(box);
        const res=CheckIfGameEnded(tempBoard);
        if(res.gameEnded===true){
            setGameEnded(true);
            setWinner('User');
        }
        setCompChance(true);
    }
    const updateMoveHistory=(box)=>{
        const tempMoveDetails=[...moveDetails];
        tempMoveDetails.reverse();
        const msg=`${playerName} completed his turn by filling box numbered ${box.row*3+Number(box.column)}`;
        tempMoveDetails.push(<MoveHistoryBox msg={msg} compChance={compChance}/>);
        tempMoveDetails.reverse();
        setMoveDetails(tempMoveDetails);
    }
    const checkAndTakeTurn=()=>{
        if(compChance===false && ticTacToeBoard[i][j]===0){
            userTakesChance();
        }
    }
    return (
        <div className='TicTacToeBox' onClick={checkAndTakeTurn}>
            <div className="TicTacToeBoxVal">
                {
                    ticTacToeBoard[i][j]===0?
                    ''
                    :
                    (
                        ticTacToeBoard[i][j]===1?
                        'X'
                        :
                        'O'
                    )
                }
            </div>
            <div className="TicTacToeBoxNo">
                {i*3+j}
            </div>
        </div>
    )
}

export default TicTacToeBox
