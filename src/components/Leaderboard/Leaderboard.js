import React, { useContext, useEffect, useState } from 'react'
import './Leaderboard.css'
import axios from 'axios'
import { contextData } from '../../AllStates'

const Leaderboard = () => {
    const context=useContext(contextData);
    const {backendLink}=context;

    const [leaderboard,setLeaderboard]=useState([]);
    const [game,setGame]=useState('SUDOKU');
    const [sortAccTo,setSortAccTo]=useState('won');
    const [finalSortAccTo,setFinalSortAccTo]=useState('SUDOKU_won');
    
    useEffect(()=>{
        setInitialLeaderboard();
    },[]);
    useEffect(()=>{
        const temp=`${game}_${sortAccTo}`;
        setFinalSortAccTo(temp);
    },[game,setGame,sortAccTo,setSortAccTo])
    useEffect(()=>{
        setInitialLeaderboard();
    },[finalSortAccTo,setFinalSortAccTo]);

    async function setInitialLeaderboard(){
        try{
            const payload={
                sortField:finalSortAccTo
            };
            const apiLink=`${backendLink}/gameStats/leaderboard`;
            const res=await axios.post(apiLink,payload);
            console.log(res.data);
            setLeaderboard(res.data);
        }catch(e){
            console.log(e);
        }
    }
    const cnvrtPercentToTwoDecimalPlaces=(percent)=>{
        return (Math.floor(percent*100))/100;
    }
    
    return (
        <div className='LeaderboardContainer'>
            <h2>Leaderboard</h2>
            <div className="Leaderboard">
                <div className="inpFieldsLeaderBoardContainer">
                    <div className="inpFieldsLeaderBoard">
                        <div className="inptHeadrLeaderBoard">Game:</div>
                        <select className='inpFieldsSelectLeaderBoard selectGameLeaderBoard' onChange={(e)=>setGame(e.target.value)}>
                            <option value="SUDOKU">Sudoku</option>
                            <option value="DOT_AND_BOXES">Dot and Boxes</option>
                            <option value="TIC_TAC_TOE">Tic Tac Toe</option>
                        </select>
                    </div>
                    <div className="inpFieldsLeaderBoard">
                        <div className="inptHeadrLeaderBoard">Sort According to: </div>
                        <select className='inpFieldsSelectLeaderBoard selectSortAccToLeaderBoard' onChange={(e)=>setSortAccTo(e.target.value)}>
                            <option value="won">number of wins</option>
                            <option value="win_percentage">win percentage</option>
                        </select>
                    </div>
                </div>
                <div className="leaderBoardHeadings">
                    <div className="hdrRank">Rank</div>
                    <div className="hdrName">UserName</div>
                    <div className="hdrWins">Number of wins</div>
                    <div className="hdrWinPercentage">Win percentage</div>
                </div>
                <div className="leaderBoardArea">
                    {
                        leaderboard.map((el,index)=>{
                            return(
                                <div className='leaderBoardEntries'>
                                    <div className="leaderBoardEntriesRank">{index+1}</div>
                                    <div className="leaderBoardEntriesInfo leaderBoardEntriesUserName">{el.username}</div>
                                    <div className="leaderBoardEntriesInfo leaderBoardEntriesWon">
                                    {
                                        game==='SUDOKU'?
                                        el.SUDOKU_won
                                        :
                                        (
                                            game==='DOT_AND_BOXES'?
                                            el.DOT_AND_BOXES_won
                                            :
                                            el.TIC_TAC_TOE_won
                                        )
                                    }
                                    </div>
                                    <div className="leaderBoardEntriesInfo leaderBoardEntriesWinPercentage">
                                    {
                                        game==='SUDOKU'?
                                        cnvrtPercentToTwoDecimalPlaces(el.SUDOKU_win_percentage)
                                        :
                                        (
                                            game==='DOT_AND_BOXES'?
                                            cnvrtPercentToTwoDecimalPlaces(el.DOT_AND_BOXES_win_percentage)
                                            :
                                            cnvrtPercentToTwoDecimalPlaces(el.TIC_TAC_TOE_win_percentage)
                                        )
                                    }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Leaderboard
