// assuming 1 for chance taken by computer and -1 for chance taken by user and 0 for empty
import React, { useContext, useEffect, useState } from 'react'
import './TicTacToe.css'
import TicTacToeGrid from './TicTacToeGrid'
import { contextData } from '../../AllStates'
import GameInfo from './GameInfo'
import axios from 'axios'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useNavigate } from 'react-router-dom'

const TicTacToe = () => {
  const { width, height } = useWindowSize();
  const context=useContext(contextData);
  const diff=context.diff.ticTacToe;
  const backend=context.backendLink;
  const playerName=localStorage.getItem('u-username');
  const token=localStorage.getItem('u-token');
  
  const navigate=useNavigate();
  useEffect(()=>{
    if(playerName===null){
      navigate('/signup_login');
    }
  },[]);

  const initialBoard=[];
  const initiallyFillBoard=()=>{
    let i,j,n;
    n=3;
    for(i=0;i<n;i++){
      let tempArr=[];
      for(j=0;j<n;j++){
        tempArr.push(0);
      }
      initialBoard.push(tempArr);
    }
  }
  initiallyFillBoard();
  const [ticTacToeBoard,setTicTacToeBoard]=useState(initialBoard);
  const [compChance,setCompChance]=useState(false);
  const [gameEnded,setGameEnded]=useState(false);
  const [winner,setWinner]=useState('Draw');
  const [moveDetails,setMoveDetails]=useState([]);
  const [finalStats,setFinalStats]=useState(null);
  const [finalMsg,setFinalMsg]=useState("NA");
  const [showUserGameDetail,setShowUserGameDetail]=useState(false);

  useEffect(()=>{
    async function editStats(){
        try{
          const payload={
            game:'TIC_TAC_TOE',
            gameResult:winner,
          }
          const apiLink=`${backend}/gameStats`;
          const res=await axios.put(apiLink,payload,{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          });
          setFinalStats(res.data);
          setTimeout(() => {
            setShowUserGameDetail(true);
          }, 2000);
          console.log(res);
        }catch(e){
          console.log(e);
        }
    }
    if(gameEnded===true){
      editStats();
    }
  },[finalMsg,setFinalMsg]);
  useEffect(()=>{
    if(moveDetails.length===9){
      setGameEnded(true);
      setFinalMsg('The Match resulted in draw!!');
    }
  },[moveDetails,setMoveDetails]);
  useEffect(()=>{
    console.log(winner);
    if(winner==='User'){
      setFinalMsg(`Congratulations you have won the game!!`);
    }
    if(winner==='Computer'){
      setFinalMsg(`Unfortunately you have lost the game!!`);
    }
  },[winner,setWinner]);
  const cnvrtPercentToTwoDecimalPlaces=(percent)=>{
    return (Math.floor(percent*100))/100;
  }
  return (
    <contextData.Provider value={{playerName,backend,diff,ticTacToeBoard,setTicTacToeBoard,compChance,setCompChance,gameEnded,setGameEnded,winner,setWinner,moveDetails,setMoveDetails}}>
      {
        winner==='User'?
        <Confetti
        width={width}
        height={height}
        />
        :
        <></>
      }
      <div className='ticTacToeContainer'>
        <div className="ticTacToeMainArea">
          {
            showUserGameDetail===false?
            <>
              <TicTacToeGrid/>
              <GameInfo/>
            </>
            :
            <div className="msgBox">
              <div className="msg">{finalMsg}</div>
              <div className="gameStats">
                <div className="gameStatsFields">
                  <div className='fieldName'>Total Games Played</div>
                  <div className='feildValue'>{finalStats?finalStats.TIC_TAC_TOE_total_games_played:``}</div>
                </div>
                <div className="gameStatsFields">
                  <div className='fieldName'>Total Games Won</div>
                  <div className='feildValue'>{finalStats?finalStats.TIC_TAC_TOE_won:``}</div>
                </div>
                <div className="gameStatsFields">
                  <div className='fieldName'>Win Percentage</div>
                  <div className='feildValue'>{finalStats?cnvrtPercentToTwoDecimalPlaces(finalStats.TIC_TAC_TOE_win_percentage):``}&#37;</div>
                </div>
                <div className="gameStatsFields">
                  <div className='fieldName'>Total Draw Games</div>
                  <div className='feildValue'>{finalStats?finalStats.TIC_TAC_TOE_draw:``}</div>
                </div>
                <div className="gameStatsFields">
                  <div className='fieldName'>Draw Percentage</div>
                  <div className='feildValue'>{finalStats?cnvrtPercentToTwoDecimalPlaces(finalStats.TIC_TAC_TOE_draw_percentage):``}&#37;</div>
                </div>
              </div>
            </div>
          }
          
        </div>
      </div>
    </contextData.Provider>
  )
}

export default TicTacToe
