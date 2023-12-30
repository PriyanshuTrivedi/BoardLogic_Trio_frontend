import React, { useContext } from 'react'
import { contextData } from '../../AllStates'

const GameInfo = () => {
    const context=useContext(contextData);
    const {playerName,moveDetails}=context;
    return (
        <div className='gameInfo'>
        <div className="dotAndBoxesScore">
            <div className="userScoreContainer scoreContainer">
                <div className="gameInfo_symbol"></div>
                <div className="gameInfo_name">{playerName}</div>
                <div className="sandBoxImg">
                    <img src={require('../../images/hourglass.gif')} alt="" id='userHourglass'/>
                </div>
            </div>
            <div className="compScoreContainer scoreContainer">
            <div className="gameInfo_symbol"></div>
                <div className="gameInfo_name">Computer</div>
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
