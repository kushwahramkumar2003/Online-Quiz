import Login from "./Components/login"
import Signup from "./Components/SignUp"
import Navbar from "./Components/Navbar"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './App.css';
import Quiz from "./Components/Quiz";

function App() {
  return (
 
   <Router>
    <Routes>
      <Route path="/" element={<Navbar/>}></Route>
      <Route exact path="/login" element={<Login/>} ></Route>
      <Route exact path="/SignUp" element={<Signup/>}></Route>
      <Route exact path="/Quiz" element={<Quiz/>} ></Route>
      
    </Routes>
   </Router>
  
  

  );
}

export default App;
