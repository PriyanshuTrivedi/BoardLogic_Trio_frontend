import React, { useContext } from 'react'
import { contextData } from '../../AllStates';
import HoriLine from './HoriLine';

const HoriLineRow = ({rowNo}) => {
    const context=useContext(contextData);
    const {n}=context;
    const HoriRow=[];
    const makeHoriRow=()=>{
        let i;
        for(i=0;i<n;i++){
            HoriRow.push(<div className='dot' id={`dot${rowNo},${i}`} >{rowNo*(Number(n)+1)+i+1}</div>);
            HoriRow.push(
                <div className='horiLineContainer'>
                    <HoriLine i={rowNo} j={i} />
                </div>
            );
        }
        HoriRow.push(<div className='dot' id={`dot${rowNo},${i}`}>{rowNo*(Number(n)+1)+i+1}</div>);
    }
    makeHoriRow();
    return (
        <div className='makeFlex'>
            {HoriRow}
        </div>
    )
}

export default HoriLineRow
