import React, { useContext, useEffect } from 'react'
import TicTacToeBox from './TicTacToeBox'
import { contextData } from '../../AllStates'
import { CheckIfGameEnded } from './CheckIfGameEnded'
import MoveHistoryBox from '../DotAndBoxes/MoveHistoryBox'
import axios from 'axios'

const TicTacToeGrid = () => {
    const context=useContext(contextData);
    const {backend,diff,ticTacToeBoard,setTicTacToeBoard,compChance,setCompChance,winner,setWinner,setGameEnded,moveDetails,setMoveDetails,gameEnded}=context;

    const ComputerTakesMoves=(box)=>{
        if(box.row===-1){
            console.log('Either Game has Ended or invalid grid');
            return;
        }
        let n=3;
        let tempBoard=[];
        for(let k=0;k<n;k++){
            let tempArr=[...ticTacToeBoard[k]];
            tempBoard.push(tempArr);
        }
        tempBoard[box.row][box.column]=1;
        setTicTacToeBoard(tempBoard);
        const result=CheckIfGameEnded(tempBoard);
        if(result.gameEnded===true){
            setWinner('Computer');
            setGameEnded(true);
        }
        updateMoveHistory(box);
    }
    const updateMoveHistory=(box)=>{
        const tempMoveDetails=[...moveDetails];
        tempMoveDetails.reverse();
        const msg=`Computer completed his turn by filling box numbered ${box.row*3+Number(box.column)}`;
        tempMoveDetails.push(<MoveHistoryBox msg={msg} compChance={compChance}/>);
        tempMoveDetails.reverse();
        setMoveDetails(tempMoveDetails);
    }
    useEffect(()=>{
        async function computerTakesTurn(){
            try{
                const payload={
                    board:ticTacToeBoard,
                    difficulty:diff
                }
                const apiLink=`${backend}/TicTacToe/findOptimalMove`;
                const res=await axios.post(apiLink,payload);
                console.log(res.data);
                setTimeout(() => {
                    ComputerTakesMoves(res.data.result);
                    setCompChance(false);
                }, 1000);
            }catch(e){
                console.log(e);
            }
        }
        if(compChance===true && gameEnded===false){
            computerTakesTurn();
        }
        if(!gameEnded){
            if(compChance){
                document.getElementById(`compHourglass`).style.visibility='visible';
                document.getElementById(`userHourglass`).style.visibility='hidden';
            }else{
                document.getElementById(`compHourglass`).style.visibility='hidden';
                document.getElementById(`userHourglass`).style.visibility='visible';
            }
        }
    },[compChance,setCompChance]);
    return (
        <div className="ticTacToeGrid">
            <TicTacToeBox i={0} j={0}/>
            <TicTacToeBox i={0} j={1}/>
            <TicTacToeBox i={0} j={2}/>
            <TicTacToeBox i={1} j={0}/>
            <TicTacToeBox i={1} j={1}/>
            <TicTacToeBox i={1} j={2}/>
            <TicTacToeBox i={2} j={0}/>
            <TicTacToeBox i={2} j={1}/>
            <TicTacToeBox i={2} j={2}/>
        </div>
    )
}

export default TicTacToeGrid
