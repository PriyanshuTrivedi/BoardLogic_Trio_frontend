import React, { useContext } from 'react'
import { contextData } from '../../AllStates';
import VertLine from './VertLine';

const VertLineRow = ({rowNo}) => {
    const context=useContext(contextData);
    const n=context.n;
    const VertRow=[];
    const makeHoriRow=()=>{
        let i;
        for(i=0;i<n;i++){
            VertRow.push(
                <div className='vertLineContainer'>
                    <VertLine i={rowNo} j={i} />
                </div>
            );
            VertRow.push(<div className='box' id={`box${rowNo},${i}`}></div>);
        }
        VertRow.push(
            <div className='vertLineContainer'>
                <VertLine i={rowNo} j={i} />
            </div>
        );
    }
    makeHoriRow();
    return (
        <div className='makeFlex'>
            {VertRow}
        </div>
    )
}

export default VertLineRow
