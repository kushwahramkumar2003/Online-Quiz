import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/SignUp.jsx";
import Home from "./pages/home/Home.jsx";

import { Routes, Route } from "react-router-dom";

import "./App.css";
import UserPage from "./pages/user/UserPage.jsx";
import EditQuizs from "./pages/admin/screens/editQuizs/EditQuizs.jsx";
import QuizPage from "./pages/quiz/QuizPage.jsx";
import Result from "./pages/user/Result.jsx";
import MyProfile from "./pages/admin/screens/myProfile/MyProfile.jsx";
import Setting from "./pages/admin/screens/setting/Setting.jsx";
import Help from "./pages/admin/screens/help/Help.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import CreateNewQuiz from "./Components/Admin/CreateNewQuiz.jsx";
import EditQuiz from "./pages/admin/screens/editQuiz/editQuiz.jsx";
import Dashboard from "./pages/admin/screens/dashboard/Dashboard.jsx";
import UserLayout from "./pages/user/UserLayout.jsx";
import UserDashboard from "./pages/user/screens/dashboard/Dashboard.jsx";
import UserNotification from "./pages/user/screens/notifications/Notifications.jsx";
import UserProfile from "./pages/user/screens/profile/Profile.jsx";
import UserQuizzes from "./pages/user/screens/quizzes/Quizzes.jsx";
import UserResult from "./pages/user/screens/result/Result.jsx";
import UserSetting from "./pages/user/screens/settings/Settings.jsx";
import UserTest from "./pages/user/screens/test/Test.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<UserPage />} />
        {/* <Route path="/admin" element={<Admin />}> */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" index element={<Dashboard />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="editQuizs" element={<EditQuizs />} />
          <Route path="createNewQuiz" element={<CreateNewQuiz />} />
          <Route path="setting" element={<Setting />} />
          <Route path="help" element={<Help />} />
          {/* <Route path="editQuiz/:quizId" element={<Help />} /> */}
          <Route path="editQuizs/editQuiz/:quiz_id" element={<EditQuiz />} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" index element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="notifications" element={<UserNotification />} />
          <Route path="quizzes" element={<UserQuizzes />} />
          <Route path="result" element={<UserResult />} />
          <Route path="setting" element={<UserSetting />} />
          <Route path="test" element={<UserTest />} />
        </Route>
        {/* <Route path="/quiz/edit/:quiz_id" element={<EditQuiz />} /> */}
        <Route path="/quiz/start/:quizId" element={<QuizPage />} />
        <Route path="/quiz/result/:quizId/:resultId" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
