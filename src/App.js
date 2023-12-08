import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/SignUp.jsx";
import Home from "./pages/home/Home.jsx";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Quiz from "./Components/Quiz";

import "./App.css";
import UserPage from "./pages/user/UserPage.jsx";
import Admin from "./pages/admin/Admin.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/SignUp" element={<Signup />}></Route>
        <Route exact path="/Quiz" element={<Quiz />}></Route>
        <Route exact path="/User" element={<UserPage />}></Route>
        <Route exact path="/Admin" element={<Admin />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
