// import './App.css'
import Home from "./Components/home"
import Login from "./Components/login"
import Signup from "./Components/SignUp"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/SignUp" element={<Signup/>}/>
          <Route exact path="/home" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;