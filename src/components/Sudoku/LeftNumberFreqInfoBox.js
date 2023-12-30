import React, { useEffect } from 'react'
import { useContext } from 'react'
import { contextData } from '../../AllStates';

const LeftNumberFreqInfoBox = ({num}) => {
    const context=useContext(contextData);
    const sudokuDetails=context.sudokuDetails;
    const freqArr=sudokuDetails.leftNumberFreq;
    useEffect(()=>{
        setAllInitially();
    },[]);
    const setAllInitially=()=>{
        for(let i=1;i<10;i++){
            const el=document.getElementById(`leftBox${i}`);
            el.style.color='white';
            el.style.backgroundColor='black';
            el.style.boxShadow='rgba(0, 0, 0, 0.24) 0px 0px 10px 6px';
        }
    }
    const selectThisNumber=()=>{
        setAllInitially();
        const id=`leftBox${num}`;
        context.setChosenDigitToFill(num);
        console.log(context.chosenDigitToFill);
        const selectedNumberBox=document.getElementById(id);
        selectedNumberBox.style.backgroundColor='red';
        selectedNumberBox.style.boxShadow='inset rgba(0, 0, 0, 0.25) 5px -5px 10px 0px';
    }
    return (
        <div className='freqNumBox' id={`leftBox${num}`} onClick={selectThisNumber}>
            <div className="numFreq">{freqArr[num]}</div>
            <div className="numWhoseFreqisGiven">{num}</div>
        </div>
    )
}

export default LeftNumberFreqInfoBox
