import React, { createContext } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Sudoku from './components/Sudoku/Sudoku';
import DotAndBoxes from './components/DotAndBoxes/DotAndBoxes';
import TicTacToe from './components/TicTacToe/TicTacToe';
import Home from './components/Home/Home';
import AllStates from './AllStates';
import SignInLogIn from './components/SignInLogIn/SignInLogIn'
import About from './components/About/About';
import Leaderboard from './components/Leaderboard/Leaderboard';

function App() {
  return (
    <AllStates>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup_login' element={<SignInLogIn/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Sudoku' element={<Sudoku/>}/>
          <Route path='/Tic_tac_toe' element={<TicTacToe/>}/>
          <Route path='/Dot_and_boxes' element={<DotAndBoxes/>}/>
          <Route path='/Leaderboard' element={<Leaderboard/>}/>
        </Routes>
      </Router>
    </AllStates>
  );
}

export default App;
