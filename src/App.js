import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/SignUp.jsx";
import Home from "./pages/home/Home.jsx";

import { Routes, Route } from "react-router-dom";

import "./App.css";
import UserPage from "./pages/user/UserPage.jsx";
import Admin from "./pages/admin/Admin.jsx";
import EditQuiz from "./pages/admin/EditQuiz.jsx";
import QuizPage from "./pages/quiz/QuizPage.jsx";
import Result from "./pages/user/Result.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Online-Quiz" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/SignUp" element={<Signup />}></Route>
        <Route exact path="/User" element={<UserPage />}></Route>
        <Route exact path="/Admin" element={<Admin />}></Route>
        <Route exact path="/quiz/edit/:quiz_id" element={<EditQuiz />}></Route>
        <Route path="/quiz/start/:quizId" element={<QuizPage />}></Route>
        <Route
          path="/quiz/result/:quizId/:resultId"
          element={<Result />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
