import React, { useContext, useEffect, useState } from 'react'
import './DotAndBoxes.css'
import { contextData } from '../../AllStates'
import MainGrid from './MainGrid'
import GameInfo from './GameInfo'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DotAndBoxes = () => {
    const { width, height } = useWindowSize();
    const context=useContext(contextData);
    const n=context.sizeDotAndBoxes;
    console.log(n);
    const backend=context.backendLink;
    const diff=context.diff.dotAndBoxes;
    console.log(diff);
    const playerName=localStorage.getItem('u-username');
    const token=localStorage.getItem('u-token');

    const navigate=useNavigate();
    useEffect(()=>{
        if(token===null){
        navigate('/signup_login');
        }
    },[]);

    const initialize2DArr=(size1,size2)=>{
        let ans=[];
        let i,j;
        for(i=0;i<size1;i++){
            let tempArr=[];
            for(j=0;j<size2;j++){
                tempArr.push(false);
            }
            ans.push(tempArr);
        }
        return ans;
    }
    const [horiLineMatrix,setHoriLineMatrix]=useState(initialize2DArr(n+1,n));
    const [vertLineMatrix,setVertLineMatrix]=useState(initialize2DArr(n,n+1));
    const [compChance,setCompChance]=useState(false);
    const [userScore,setUserScore]=useState(0);
    const [compScore,setCompScore]=useState(0);
    const [moveDetails,setMoveDetails]=useState([]);
    const [userWon,setUserWon]=useState(false);
    const [gameEnded,setGameEnded]=useState(false);
    const [finalStats,setFinalStats]=useState(null);
    const [finalMsg,setFinalMsg]=useState("msg");
    const [canEditStat,setCanEditStat]=useState(false);
    
    useEffect(()=>{
        if(compScore+userScore===n*n){
            setCanEditStat(true);
            setGameEnded(true);
            if(userScore>compScore){
                setFinalMsg(`Congratulations you have won the game by ${userScore-compScore} points!!`);
                setUserWon(true);
            }
            else{
                setFinalMsg(`Unfortunately you lost the game by ${compScore-userScore} points. Better luck next time.`);
            }
        }
    },[compScore,setCompScore,userScore,setUserScore]);

    useEffect(()=>{
        async function editStats(){
            try{
                const payload={
                    game:'DOT_AND_BOXES',
                    gameResult:userWon,
                }
                const apiLink=`${backend}/gameStats`;
                const res=await axios.put(apiLink,payload,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                });
                setFinalStats(res.data);
                console.log(res);
            }catch(e){
                console.log(e);
            }
        }
        if(gameEnded===true && canEditStat===true){
            document.getElementById('chngeBlockToFlex').style.display='flex';
            setCanEditStat(false);
            editStats();
        }
    },[gameEnded,setGameEnded]);

    useEffect(()=>{
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
    const cnvrtPercentToTwoDecimalPlaces=(percent)=>{
        return (Math.floor(percent*100))/100;
    }

    return (
        <contextData.Provider value={{playerName,n,backend,diff,horiLineMatrix,setHoriLineMatrix,vertLineMatrix,setVertLineMatrix,compChance,setCompChance,userScore,setUserScore,compScore,setCompScore,moveDetails,setMoveDetails}} >
            {
                userWon===true?
                <Confetti
                width={width}
                height={height}
                />
                :
                <></>
            }
            <div className="DotAndBoxesContainer">
                <div className='DotAndBoxes' id='chngeBlockToFlex'>
                    {
                        gameEnded===false?
                        <>
                            <MainGrid/>
                            <GameInfo/>
                        </>
                        :
                        <div className="msgBox">
                            <div className="msg">{finalMsg}</div>
                            <div className="gameStats">
                                <div className="gameStatsFields">
                                    <div className='fieldName'>Total Games Played</div>
                                    <div className='feildValue'>{finalStats?finalStats.DOT_AND_BOXES_total_games_played:``}</div>
                                </div>
                                <div className="gameStatsFields">
                                    <div className='fieldName'>Total Games Won</div>
                                    <div className='feildValue'>{finalStats?finalStats.DOT_AND_BOXES_won:``}</div>
                                </div>
                                <div className="gameStatsFields">
                                    <div className='fieldName'>Win Percentage</div>
                                    <div className='feildValue'>{finalStats?cnvrtPercentToTwoDecimalPlaces(finalStats.DOT_AND_BOXES_win_percentage):``}&#37;</div>
                                </div>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </contextData.Provider>
    )
}

export default DotAndBoxes
