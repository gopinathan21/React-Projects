import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import SignIn from "./components/SignIn/signIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/index";
import TypingSpeed from './components/TypingSpeed/TypingSpeed'
import Header from "./components/Header/Header";
import VerifiedUser from "./components/VerifiedUser/VerifiedUser"
import WishQuest from "./components/WishQuest/WishQuest";
import Pong from "./components/Pong/pong";
import Rapid from "./components/RapidAPI/Rapid";


// CSS Area
// import './css/index.css';

const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element = {<Rapid/>} />
      {/* {<Route path = "/" element = {<Pong/>}/>} */}
      {/* <Route path ="/" element = {<WishQuest/>} /> */}
      {/* <Route path="/" element = {<TypingSpeed/>}/> */}
      {/* <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<VerifiedUser><Home /></VerifiedUser>} /> */}
      {/* <Route path="/SignUp" element={<SignUp />} /> */}
      {/* <Route path="*" element={<Navigate to="/SignIn" />} /> */}
    </Routes>
    </>
  );
};

export default App;
