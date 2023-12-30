import React, { createContext } from 'react'
import { useState } from 'react'

const contextData=createContext();

const AllStates = (props) => {

    const backendLink='https://board-logic-trio-backend.glitch.me';

    const [user, setUser] = useState({username: '', email: '',user_mongo_id:''});

    const [sizeDotAndBoxes, setSizeDotAndBoxes]=useState(5);
    const [diff,setDiff]=useState(
        {
            sudoku:"beginner",
            dotAndBoxes:"easy",
            ticTacToe:"easy"
        }
    )


    return (
        <contextData.Provider value={{backendLink,user, setUser,sizeDotAndBoxes, setSizeDotAndBoxes,diff,setDiff}}>
            {props.children}
        </contextData.Provider>
    )
}

export default AllStates;
export {contextData};