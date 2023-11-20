import Login from "./Components/login"
import Signup from "./Components/SignUp"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './App.css';

function App() {
  return (
    
   <Router>
    <Routes>
      <Route exact path="/" element={<Login/>} ></Route>
      <Route exact path="/SignUp" element={<Signup/>}></Route>

    </Routes>
   </Router>

  );
}

export default App;
