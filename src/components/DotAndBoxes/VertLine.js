import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import MoveHistoryBox from './MoveHistoryBox';

const VertLine = ({i,j}) => {
  const context=useContext(contextData);
    const {n,playerName,compChance,setCompChance,userScore,setUserScore,compScore,setCompScore,horiLineMatrix,setHoriLineMatrix,vertLineMatrix,setVertLineMatrix,moveDetails,setMoveDetails}=context;

    const toAddMoveDetails=[];

    const drawLine=()=>{
      // updating verticalLineMatrix 
      let ii,jj;
      let tempVertLineMatrix=[];
      for(ii=0;ii<n;ii++){
        let tempArr=[];
        for(jj=0;jj<=n;jj++){
          tempArr.push(vertLineMatrix[ii][jj]);
        }
        tempVertLineMatrix.push(tempArr);
      }
      tempVertLineMatrix[i][j]=true;
      setVertLineMatrix(tempVertLineMatrix);
      // changing styling of vertLine 
      const selectedVertLine=document.getElementById(`vertLine${i},${j}`);
      console.log(selectedVertLine);
      selectedVertLine.style.backgroundColor='black';
    }
    const checkLeft=()=>{
      if(j-1>=0){
        if(vertLineMatrix[i][j-1]===true && horiLineMatrix[i][j-1]===true && horiLineMatrix[i+1][j-1]){
          const leftBox=document.getElementById(`box${i},${j-1}`);
          leftBox.style.backgroundColor='red';
          return 1;
        }
      }
      return 0;
    }
    const checkRight=()=>{
      if(j+1<=n){
        if(vertLineMatrix[i][j+1]===true && horiLineMatrix[i][j]===true && horiLineMatrix[i+1][j]){
          const rightBox=document.getElementById(`box${i},${j}`);
          rightBox.style.backgroundColor='red';
          return 1;
        }
      }
      return 0;
    }
    const updateMoveHistory=(gain)=>{
      const tempMoveDetails=[...moveDetails];
      tempMoveDetails.reverse();
      const msg=`${playerName} connected dot ${i*(Number(n)+1)+Number(j)+1} to dot ${i*(Number(n)+1)+Number(j)+Number(n)+2} ${gain>0?`and scored ${gain} points`:``}`;
      toAddMoveDetails.push(<MoveHistoryBox msg={msg} compChance={compChance}/>);
      toAddMoveDetails.forEach(message => {
        tempMoveDetails.push(message);
      });
      tempMoveDetails.reverse();
      setMoveDetails(tempMoveDetails);
  }
    const drawVertLineIfUserChance=()=>{
      if(!compChance && !vertLineMatrix[i][j]){
        drawLine();
        const gain=checkLeft()+checkRight();
        updateMoveHistory(gain);
        setUserScore((userScore)=>userScore+gain);
        if(gain===0){
          setCompChance(true);
        }
      }else{
          if(compChance){
            console.log(`its computer's chance`);
          }
          else if(vertLineMatrix[i][j]){
            console.log(`the selected line was already made`);
          }
      }
    }
    return (
      <div className='vertLine' id={`vertLine${i},${j}`} onClick={drawVertLineIfUserChance}></div>
    )
}

export default VertLine
