import Login from "./pages/login/login.js";
import Signup from "./pages/signup/SignUp.js";
import Home from "./pages/home/Home.js";
import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/user/UserPage.js";
import EditQuizs from "./pages/admin/screens/editQuizs/EditQuizs.js";
import QuizPage from "./pages/quiz/QuizPage.js";
import Result from "./pages/user/Result.js";
import MyProfile from "./pages/admin/screens/myProfile/MyProfile.js";
import Setting from "./pages/admin/screens/setting/Setting.js";
import Help from "./pages/admin/screens/help/Help.js";
import AdminLayout from "./pages/admin/AdminLayout.js";
import CreateNewQuiz from "./Components/Admin/CreateNewQuiz.js";
import EditQuiz from "./pages/admin/screens/editQuiz/EditQuiz.tsx";
import Dashboard from "./pages/admin/screens/dashboard/Dashboard.tsx";
import UserLayout from "./pages/user/UserLayout.js";
import UserDashboard from "./pages/user/screens/dashboard/Dashboard.js";
import UserNotification from "./pages/user/screens/notifications/Notifications.js";
import UserProfile from "./pages/user/screens/profile/Profile.js";
import UserQuizzes from "./pages/user/screens/quizzes/Quizzes.js";
import UserResult from "./pages/user/screens/result/Result.js";
import UserSetting from "./pages/user/screens/settings/Settings.js";
import UserTest from "./pages/user/screens/test/Test.js";
import "./App.css";

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
