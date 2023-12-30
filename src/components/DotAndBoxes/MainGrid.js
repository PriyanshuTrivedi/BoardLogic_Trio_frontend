import React, { useContext, useEffect, useState } from 'react'
import { contextData } from '../../AllStates'
import HoriLineRow from './HoriLineRow';
import VertLineRow from './VertLineRow';
import axios from 'axios'
import MoveHistoryBox from './MoveHistoryBox';

const MainGrid = () => {
    const context=useContext(contextData);
    const {n,backend,diff,horiLineMatrix,setHoriLineMatrix,vertLineMatrix,setVertLineMatrix,compChance,setCompChance,userScore,setUserScore,compScore,setCompScore,moveDetails,setMoveDetails}=context;

    const toAddMoveDetails=[];

    const grid=[];
    const constructGrid=()=>{
        let i;
        grid.push(<HoriLineRow rowNo={0} key={`HoriLineRow0`}/>);
        for(i=0;i<n;i++){
            grid.push(<VertLineRow rowNo={i} key={`VertLineRow${i}`}/>)
            grid.push(<HoriLineRow rowNo={i+1} key={`HoriLineRow${i+1}`}/>);
        }
    }

    const getIdOfLine=(move)=>{
        if(move[0]===1){
            return `horiLine${move[1]},${move[2]}`;
        }else{
            return `vertLine${move[1]},${move[2]}`;
        }
    }
    const completeAboveBox=(move)=>{
        const aboveBox=document.getElementById(`box${move[1]-1},${move[2]}`);
        aboveBox.style.backgroundColor='green';
    }
    const completeBottomBox=(move)=>{
        const bottomBox=document.getElementById(`box${move[1]},${move[2]}`);
        bottomBox.style.backgroundColor='green';
    }
    const completeLeftBox=(move)=>{
        const leftBox=document.getElementById(`box${move[1]},${move[2]-1}`);
        leftBox.style.backgroundColor='green';
    }
    const completeRightBox=(move)=>{
        console.log('yha ara right m')
        const rightBox=document.getElementById(`box${move[1]},${move[2]}`);
        rightBox.style.backgroundColor='green';
    }
    const drawCompLine=(move)=>{
        const selectedLine=document.getElementById(getIdOfLine(move));
        selectedLine.style.backgroundColor='black';
    }
    const updateMatrices=(moveSet)=>{
        let ii,jj;
        let tempHoriLineMatrix=[];
        for(ii=0;ii<=n;ii++){
            let tempArr=[];
            for(jj=0;jj<n;jj++){
                tempArr.push(horiLineMatrix[ii][jj]);
            }
            tempHoriLineMatrix.push(tempArr);
        }
        let tempVertLineMatrix=[];
        for(ii=0;ii<n;ii++){
            let tempArr=[];
            for(jj=0;jj<=n;jj++){
                tempArr.push(vertLineMatrix[ii][jj]);
            }
            tempVertLineMatrix.push(tempArr);
        }
        moveSet.forEach(move => {
            if(move[0]===1){
                tempHoriLineMatrix[move[1]][move[2]]=true;
            }
            else{
                tempVertLineMatrix[move[1]][move[2]]=true;
            }
        });
        setHoriLineMatrix(tempHoriLineMatrix);
        setVertLineMatrix(tempVertLineMatrix);
    }
    const updateMoveHistory=(move)=>{
        const tempMoveDetails=[...moveDetails];
        tempMoveDetails.reverse();
        let msg;
        if(move[0]===1){
            msg=`Computer connected dot ${move[1]*(Number(n)+1)+move[2]+1} to dot ${move[1]*(Number(n)+1)+move[2]+2} ${move.length>3?`and scored ${move[3].length} points`:``}`;
        }
        else{
            msg=`Computer connected dot ${move[1]*(Number(n)+1)+move[2]+1} to dot ${move[1]*(Number(n)+1)+move[2]+Number(n)+2} ${move.length>3?`and scored ${move[3].length} points`:``}`;
        }
        toAddMoveDetails.push(<MoveHistoryBox msg={msg} compChance={compChance}/>);
        toAddMoveDetails.forEach(message => {
            tempMoveDetails.push(message);
        });
        tempMoveDetails.reverse();
        setMoveDetails(tempMoveDetails);
    }
    const completeComputerMove=(move)=>{
        drawCompLine(move);
        updateMoveHistory(move);
        if(move.length>3){
            setCompScore((compScore)=>compScore+move[3].length);
            console.log(move[3]);
            for(let ii=0;ii<move[3].length;ii++){
                let boxDir=move[3][ii];
                switch(boxDir){
                    case 'L':
                        completeLeftBox(move);
                        break;
                    case 'R':
                        completeRightBox(move);
                        break;
                    case 'U':
                        completeAboveBox(move);
                        break;
                    case 'D':
                        completeBottomBox(move);
                        break;
                }
            };
        }
    }
    const ComputerTakesMoves=(computerMoveSet)=>{
        const moveSet=computerMoveSet.optimalChancesTakenInSequence;
        updateMatrices(moveSet);
        moveSet.forEach((move,index) => {
            setTimeout(() => {
                completeComputerMove(move);
            }, (index+1)*1000);
        });
        setTimeout(() => {
            setCompChance(false);
        }, moveSet.length*1000);
    }

    useEffect(()=>{
        if(compChance){
            console.log('Now its compChance');
            async function computerTakesTurn(){
                try{
                    const payload={
                        vertLineMatrix:vertLineMatrix,
                        horiLineMatrix:horiLineMatrix,
                        difficulty:diff
                    }
                    const apiLink=`${backend}/DotAndBoxes/findOptimalMove`;
                    const res=await axios.post(apiLink,payload);
                    console.log(res.data);
                    ComputerTakesMoves(res.data.result);
                }catch(e){
                    console.log(e);
                }
            }
            computerTakesTurn();
        }
    },[compChance,setCompChance]);
    constructGrid();
    return (
        <div className="mainGridContainer">
            <div className='mainGrid'>
                {grid}
            </div>
        </div>
    )
}

export default MainGrid
