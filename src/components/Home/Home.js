import React, { useContext, useState } from "react";
import "./Home.css";
import { contextData } from "../../AllStates";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const context=useContext(contextData);
  const updateDiff=(game,newValue)=>{
    const tempObj={...context.diff};
    tempObj[game]=newValue;
    context.setDiff(tempObj);
  }
  return (
    <>
      <Navbar/>
      <div className="mainHome">
        <div className="gamesContainer">
          <div id='homeSudokuBox' className="homeBox">
            <div className="gameImg">
              <img src={require("../../images/sudoku.png")} alt="" srcset="" />
            </div>
            <h2>Sudoku</h2>
            <div className="inptBoxHome">
              <div className="inptHeader">Difficulty:</div>
              <select
                className="inptFieldHome"
                value={context.diff.sudoku}
                onChange={(e) => updateDiff("sudoku",e.target.value)}
              >
                <option value="beginner" defaultValue>Beginner</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <Link className="links" to={localStorage.getItem('u-username')?'/Sudoku':'/signup_login'}>
              <div className='playBtnsHome' id="playSudoku">PLAY</div>
            </Link>
          </div>
          <div id='homeDotAndBoxesBox' className="homeBox">
            <div className="gameImg">
              <img src={require("../../images/dotAndBoxes.jpg")} alt="" srcset="" />
            </div>
            <h2>Dot And Boxes</h2>
            <div className="inptBoxHome">
              <div className="inptHeader">Difficulty:</div>
              <select
                className="inptFieldHome"
                value={context.diff.dotAndBoxes}
                onChange={(e) => updateDiff("dotAndBoxes",e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium" defaultValue>Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="inptBoxHome">
              <div className="inptHeader">Size of Matrix:</div>
              <select
                className="inptFieldHome"
                value={context.sizeDotAndBoxes}
                onChange={(e) => context.setSizeDotAndBoxes(e.target.value)}
              >
                <option value="5">5X5 matrix</option>
                <option value="7" defaultValue>7X7 matrix</option>
                <option value="9">9X9 matrix</option>
              </select>
            </div>
            <Link className="links" to={localStorage.getItem('u-username')?'/Dot_and_boxes':'/signup_login'}>
              <div className='playBtnsHome' id="playDotAndBoxes">PLAY</div>
            </Link>
          </div>
          <div id='homeTicTacToeBox' className="homeBox">
            <div className="gameImg">
              <img src={require("../../images/ticTacToe.png")} alt="" srcset="" />
            </div>
            <h2>Tic Tac Toe</h2>
            <div className="inptBoxHome">
              <div className="inptHeader">Difficulty:</div>
              <select
                className="inptFieldHome"
                value={context.diff.ticTacToe}
                onChange={(e) => updateDiff("ticTacToe",e.target.value)}
              >
                <option value="easy">Beginner</option>
                <option value="medium" defaultValue>Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <Link className="links" to={localStorage.getItem('u-username')?'/Tic_tac_toe':'/signup_login'}>
              <div className='playBtnsHome' id="playTicTacToe">PLAY</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
