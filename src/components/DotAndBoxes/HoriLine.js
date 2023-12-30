import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import MoveHistoryBox from './MoveHistoryBox';

const HoriLine = ({i,j}) => {
    const context=useContext(contextData);
    const {n,playerName,compChance,setCompChance,userScore,setUserScore,compScore,setCompScore,horiLineMatrix,setHoriLineMatrix,vertLineMatrix,setVertLineMatrix,moveDetails,setMoveDetails}=context;

    const toAddMoveDetails=[];

    const drawLine=()=>{
        // updating horizontalLineMatrix 
        let ii,jj;
        let tempHoriLineMatrix=[];
        for(ii=0;ii<=n;ii++){
            let tempArr=[];
            for(jj=0;jj<n;jj++){
                tempArr.push(horiLineMatrix[ii][jj]);
            }
            tempHoriLineMatrix.push(tempArr);
        }
        tempHoriLineMatrix[i][j]=true;
        setHoriLineMatrix(tempHoriLineMatrix);
        // changing styling of horiLine 
        const selectedHoriLine=document.getElementById(`horiLine${i},${j}`);
        console.log(selectedHoriLine);
        selectedHoriLine.style.backgroundColor='black';
    }
    const checkTop=()=>{
        if(i-1>=0){
            if(horiLineMatrix[i-1][j]===true && vertLineMatrix[i-1][j]===true && vertLineMatrix[i-1][j+1]){
                const aboveBox=document.getElementById(`box${i-1},${j}`);
                aboveBox.style.backgroundColor='red';
                return 1;
            }
        }
        return 0;
    }
    const checkBottom=()=>{
        if(i+1<=n){
            if(horiLineMatrix[i+1][j]===true && vertLineMatrix[i][j]===true && vertLineMatrix[i][j+1]){
                const bottomBox=document.getElementById(`box${i},${j}`);
                bottomBox.style.backgroundColor='red';
                return 1;
            }
        }
        return 0;
    }
    const updateMoveHistory=(gain)=>{
        const tempMoveDetails=[...moveDetails];
        tempMoveDetails.reverse();
        const msg=`${playerName} connected dot ${i*(Number(n)+1)+Number(j)+1} to dot ${i*(Number(n)+1)+Number(j)+2} ${gain>0?`and scored ${gain} points`:``}`;
        toAddMoveDetails.push(<MoveHistoryBox msg={msg} compChance={compChance}/>);
        toAddMoveDetails.forEach(message => {
            tempMoveDetails.push(message);
        });
        tempMoveDetails.reverse();
        setMoveDetails(tempMoveDetails);
    }
    const drawHoriLineIfUserChance=()=>{
        if(!compChance && !horiLineMatrix[i][j]){
            drawLine();
            const gain=checkTop()+checkBottom();
            updateMoveHistory(gain);
            setUserScore((userScore)=>userScore+gain);
            if(gain===0){
                setCompChance(true);
            }
        }else{
            if(compChance){
                console.log(`its computer's chance`);
            }
            else if(horiLineMatrix[i][j]){
                console.log(`the selected line was already made`);
            }
        }
    }
    return (
        <div className='horiLine' id={`horiLine${i},${j}`} onClick={drawHoriLineIfUserChance}></div>
    )
}

export default HoriLine
