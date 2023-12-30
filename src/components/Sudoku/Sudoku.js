import React, { useContext } from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import './Sudoku.css'
import Sudoku9X9row from './Sudoku9X9board'
import LeftNumberFreqInfoBox from './LeftNumberFreqInfoBox'
import { FindLeftFreq } from './FindLeftFreq'
import { contextData } from '../../AllStates'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Sudoku = () => {
    const { width, height } = useWindowSize();
    const context=useContext(contextData);
    const backend=context.backendLink;
    const diff=context.diff.sudoku;
    const [gameStarted,setGameStarted]=useState(false);
    const [sudoku,setSudoku]=useState();
    const [solvedSudoku,setSolvedSudoku]=useState();
    const [wrongAns,setWrongAns]=useState(false);
    const [finalMsg,setFinalMsg]=useState("msg");
    const [blanks,setBlanks]=useState(81);
    const [timeTaken,setTimeTaken]=useState(0);
    const [chosenDigitToFill,setChosenDigitToFill]=useState(0);
    const [gameEnded,setGameEnded]=useState(false);
    const [canEditStat,setCanEditStat]=useState(false);
    const [finalStats,setFinalStats]=useState(null);
    const tempSudoku='.'.repeat(81);
    const token=localStorage.getItem('u-token');

    const navigate=useNavigate();
    useEffect(()=>{
        if(token===null){
        navigate('/signup_login');
        }
    },[]);

    const initialSudokoData={
        leftNumberFreq:new Array(10).fill(9),
        originalSudoku:tempSudoku,
        solvableUniqueSudoku:tempSudoku,
        blanks:81
    };
    const [sudokuDetails,setSudokuDetails]=useState(initialSudokoData);
    useEffect(()=>{
        if(gameStarted){
            setTimeout(() => {
            setTimeTaken((timeTaken+1)%3600);
            }, 1000);
        }
        else{
            setTimeTaken(0);
        }
        if(blanks===0 && gameEnded===false){
            setCanEditStat(true);
            setFinalMsg(`Congratulations you have completed the suduko in ${timeTaken} seconds!!`);
            quitGame();
        }
        if(wrongAns===true && gameEnded===false){
            setCanEditStat(true);
            quitGame();
        }
    });

    useEffect(()=>{
        async function editStats(){
            try{
                const payload={
                    game:'SUDOKU',
                    gameResult:(blanks===0)?true:false,
                    timeTaken:timeTaken
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
            setCanEditStat(false);
            editStats();
        }
    },[gameEnded,setGameEnded])

    useEffect(()=>{
        hideTimeAndShowBtnBox();
        hideQuitAndShowBackBox();
        setSudokuDetails(initialSudokoData);
    },[]);
    const hideTimeAndShowBtnBox=()=>{
        const btn=document.getElementById('btn1');
        const timeBox=document.getElementById('timeBox');
        btn.style.zIndex=1;
        timeBox.style.zIndex=-1;
    }
    const showTimeAndHideBtnBox=()=>{
        const btn=document.getElementById('btn1');
        const timeBox=document.getElementById('timeBox');
        btn.style.zIndex=-1;
        timeBox.style.zIndex=1;
    }
    const hideQuitAndShowBackBox=()=>{
        const quitBox=document.getElementById('quitBox');
        const backBox=document.getElementById('backBox');
        quitBox.style.zIndex=-1;
        backBox.style.zIndex=1;
    }
    const showQuitAndHideBackBox=()=>{
        const quitBox=document.getElementById('quitBox');
        const backBox=document.getElementById('backBox');
        quitBox.style.zIndex=1;
        backBox.style.zIndex=-1;
    }
    const generateSudoku=async()=>{
        try{
            const payload={
                difficulty:diff
            }
            const apiLink=`${backend}/Sudoku/findRandomSolvableSudokuWithSolution`;
            const res=await axios.post(apiLink,payload,{
                headers:{
                    'Content-Type':'application/json',
                }
            });
            console.log(res);
            const tempsSudokuProps={
                originalSudoku:res.data.completeSudoku,
                tempSudoku:res.data.partiallyFilledSudokuWithUniqueSolution,
                blanks:res.data.blanks
            };
            let initialFreq=FindLeftFreq(tempsSudokuProps);
            console.log(tempsSudokuProps);
            const newSudokuDetails={
                originalSudoku:tempsSudokuProps.originalSudoku,
                solvableUniqueSudoku:tempsSudokuProps.tempSudoku,
                leftNumberFreq:initialFreq,
                blanks:tempsSudokuProps.blanks
            };
            setSudokuDetails(newSudokuDetails);
            setSolvedSudoku(res.data.completeSudoku);
            setSudoku(tempsSudokuProps.tempSudoku);
            setBlanks(res.data.blanks);
            setGameStarted(true);
            showQuitAndHideBackBox();
            showTimeAndHideBtnBox();
        }catch(e){
            console.log("there was an error while generating a random sudoku and the error was->");
            console.log(e);
        }
    };
    const twoDigFormat=(time)=>{
        if(time<10){
            return '0'+time;
        }
        return ''+time;
    }
    const cnvertSecToMinSec=(time)=>{
        return (parseInt(time/60)>0?`${parseInt(time/60)} minutes`:``)+`${time%60} seconds`;
    }
    const cnvrtPercentToTwoDecimalPlaces=(percent)=>{
        return (Math.floor(percent*100))/100;
    }
    const quitGame=()=>{
        setTimeTaken(0);
        setGameStarted(false);
        hideTimeAndShowBtnBox();
        hideQuitAndShowBackBox();
        setGameEnded(true);
        if(blanks!==0){
            const initialSudokoData={
                leftNumberFreq:new Array(10).fill(9),
                originalSudoku:tempSudoku,
                solvableUniqueSudoku:tempSudoku,
                blanks:81
            };
            setSudokuDetails(initialSudokoData);
        }
    }
    return (
        <contextData.Provider value={{sudokuDetails,setSudokuDetails,chosenDigitToFill,setChosenDigitToFill,finalMsg,setFinalMsg,wrongAns,setWrongAns}}>
            {
                blanks===0?
                <Confetti
                width={width}
                height={height}
                />
                :
                <></>
            }
            <div className="Sudoku">
                <div className="sudokuPage">
                    <div className="diffBoxAndTimeAndGenBoxAndQuitBox">
                        <div className="generateSudokuBtnAndTimeBox">
                            <div id="btn1" onClick={generateSudoku}>Generate Sudoku</div>
                            <div id="timeBox">
                                <div className="timeLabel">Time Taken :</div>
                                <div className="time">
                                    {twoDigFormat(parseInt(timeTaken/60))}:{twoDigFormat(timeTaken%60)}
                                </div>
                            </div>
                        </div>
                        <div className="quitAndBackBox">
                            <div id="quitBox" onClick={()=>quitGame()}>Quit</div>
                            <Link to='/'>
                                <div id="backBox">Back</div>
                            </Link>
                        </div>
                    </div>
                    {
                        !(blanks===0||wrongAns===true)
                        ? 
                        <div className="sudokuInfo">
                            <div className="sudokuBoardSkeleton">
                                <Sudoku9X9row/>
                            </div>
                            <div className="leftBoxesNumberFreq">
                                <LeftNumberFreqInfoBox num={1}/>
                                <LeftNumberFreqInfoBox num={2}/>
                                <LeftNumberFreqInfoBox num={3}/>
                                <LeftNumberFreqInfoBox num={4}/>
                                <LeftNumberFreqInfoBox num={5}/>
                                <LeftNumberFreqInfoBox num={6}/>
                                <LeftNumberFreqInfoBox num={7}/>
                                <LeftNumberFreqInfoBox num={8}/>
                                <LeftNumberFreqInfoBox num={9}/>
                            </div>
                        </div>
                        :
                        <div className="msgBox">
                            <div className="msg">{finalMsg}</div>
                            <div className="gameStats">
                                <div className="gameStatsFields">
                                    <div className='fieldName'>Total Games Played</div>
                                    <div className='feildValue'>{finalStats?finalStats.SUDOKU_total_games_played:``}</div>
                                </div>
                                <div className="gameStatsFields">
                                    <div className='fieldName'>Total Games Won</div>
                                    <div className='feildValue'>{finalStats?finalStats.SUDOKU_won:``}</div>
                                </div>
                                <div className="gameStatsFields">
                                    <div className='fieldName'>Best Time</div>
                                    <div className='feildValue'>{finalStats?(
                                        finalStats.SUDOKU_best_time===3600?
                                        cnvertSecToMinSec(finalStats.SUDOKU_best_time):`NA`)
                                        :``}
                                    </div>
                                </div>
                                <div className="gameStatsFields">
                                    <div className='fieldName'>Win Percentage</div>
                                    <div className='feildValue'>{finalStats?cnvrtPercentToTwoDecimalPlaces(finalStats.SUDOKU_win_percentage):``}&#37;</div>
                                </div>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </contextData.Provider>
    )
}

export default Sudoku;
