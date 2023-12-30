import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import './GameInfo.css'
import '../../images/hourglass.gif'

const GameInfo = () => {
  const context=useContext(contextData);
  const {n,playerName,backend,diff,horiLineMatrix,setHoriLineMatrix,vertLineMatrix,setVertLineMatrix,compChance,setCompChance,userScore,setUserScore,compScore,setCompScore,moveDetails,setMoveDetails}=context;
  return (
    <div className='gameInfo'>
      <div className="dotAndBoxesScore">
        <div className="userScoreContainer scoreContainer">
          <div className="gameInfo_color userColor"></div>
          <div className="gameInfo_name">{playerName}</div>
          <div className="gameInfo_score">{userScore}</div>
          <div className="sandBoxImg">
            <img src={require('../../images/hourglass.gif')} alt="" id='userHourglass'/>
          </div>
        </div>
        <div className="compScoreContainer scoreContainer">
          <div className="gameInfo_color compColor"></div>
            <div className="gameInfo_name">Computer</div>
            <div className="gameInfo_score">{compScore}</div>
            <div className="sandBoxImg">
              <img src={require('../../images/hourglass.gif')} alt="" id='compHourglass'/>
            </div>
        </div>
      </div>
      <div className="moveDetailsContainer">
        <h3>Move History</h3>
        <div className="moveDetails">
          {moveDetails}
        </div>
      </div>
    </div>
  )
}

export default GameInfo
