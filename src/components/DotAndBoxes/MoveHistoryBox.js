import React from 'react'

const MoveHistoryBox = ({msg,compChance}) => {
  return (
    <>
    {
        compChance?
        <div className='gameInfo_moveHistoryBox gameInfo_moveHistoryBoxWhenCompChance'>
            {msg}
        </div>
        :
        <div className='gameInfo_moveHistoryBox gameInfo_moveHistoryBoxWhenUserChance'>
            {msg}
        </div>
    }
    </>
  )
}

export default MoveHistoryBox
