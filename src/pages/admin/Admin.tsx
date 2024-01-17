import React, { useEffect } from "react";
// import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getAllQuizs } from "../../services/quiz.js";
import QuizCard from "../../Components/Admin/QuizCard.js";
import { useDispatch } from "react-redux";
// import { IoMdAdd } from "react-icons/io";
import Modal from "../../Components/modal/Modal.js";
import CreateNewQuiz from "../../Components/Admin/CreateNewQuiz.js";
import "./Admin.css";
import images from "../../constants/images.js";

import { IoMdArrowDropdown } from "react-icons/io";
import { logout } from "../../store/actions/userActions.js";
import { toast } from "react-hot-toast";
import { logout as Logout } from "../../services/user.js";
import { RootState } from "../../store/types.js";

const Admin = () => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const [quiz, setQuiz] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const userState = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  // const { data } = useQuery();

  useEffect(() => {
    const role = userState?.userInfo?.role;

    // if (!role) {
    //   navigate("/");
    // }

    console.log("Role", role);
    async function fetchData() {
      const quizArr = await getAllQuizs();
      console.log("Quiz Arr", quizArr);
      setQuiz(quizArr);
    }
    if (!userState.userInfo || !role || !(role === "ADMIN")) {
      navigate("/");
    } else fetchData();
  }, [userState.userInfo, navigate, isOpen, refresh]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const quizArr = await getAllQuizs();
  //     console.log("Quiz Arr", quizArr);
  //     setQuiz(quizArr);
  //   }
  //   fetchData();
  // }, [isOpen, refresh]);

  const { mutate } = useMutation({
    mutationFn: () => {
      return Logout();
    },
    onSuccess: async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(logout());
      toast.success("Logout successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const logoutHandler = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      {/* this code written by deepesh */}
      <div className="admin-page">
        <div className="Admin-manu">
          <div className="Grad-logo">
            <h1 className="logo-name-for-admin">QuizGrad</h1>
            <img src={images.MyAdmin} alt="profile"></img>
            <p>Admin</p>
          </div>

          <div className="admin-box">
            <img src={images.Dashboard} alt="MyProfile" id="Admin-icon"></img>
            {/* <RiDashboard3Fill id="Admin-icon"/> */}
            <p>Dashboard</p>
          </div>

          <div className="admin-box">
            <img src={images.MyProfile} alt="MyProfile" id="Admin-icon"></img>
            <p>My Profile</p>
          </div>

          <div className="admin-box">
            <button
              className="flex flex-row items-center gap-4 text-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img src={images.CreateQuiz} alt="CreateQuiz" id="Admin-icon" />
              <span>Create Quiz</span>
            </button>
          </div>

          <div className="admin-box">
            <img src={images.Update} alt="updates" id="Admin-icon"></img>
            <p>Edit Quiz</p>
          </div>

          <div className="admin-box">
            <img src={images.Setting} alt="setting" id="Admin-icon"></img>
            <p>Settings</p>
          </div>

          <div className="admin-box">
            <img src={images.Help} alt="help" id="Admin-icon"></img>
            <p>Help</p>
          </div>

          <div className="admin-box" onClick={(e) => logoutHandler(e)}>
            <img src={images.Logout} alt="logout" id="Admin-icon"></img>
            <p>Logout</p>
          </div>
        </div>

        <div className="admin-right-page">
          <div className="admin-navbar">
            <div className="admin-logo-right">
              <img
                src={images.MessageIcon}
                alt="Message"
                id="message-bell"
              ></img>
              <img src={images.bellIcon} alt="Bell" id="message-bell"></img>

              <img src={images.User} alt="User" id="Admin-logo"></img>
              <IoMdArrowDropdown id="Drop-down-menu-icon" />
            </div>
          </div>
          <div className="shaded-line"></div>

          <div className="admin-content">
            <div className="quiz-create-box">
              {/* <h2>All Quizes</h2> */}

              <div className="quiz-box-coming">
                {quiz.map((q) => {
                  return (
                    <QuizCard
                      title={q.title}
                      category={q.category}
                      description={q.description}
                      // times_taken={q.times_taken || q.duration}
                      quiz_id={q._id}
                      questions={q.questions.length}
                      duration={q.duration || q?.times_taken}
                      // level={q.level}
                      numberOfQuestions={q.numberOfQuestions}
                      published={q.published}
                      key={q._id}
                      setRefresh={setRefresh}
                    />
                  );
                })}
              </div>
              {isOpen && (
                <Modal setIsOpen={setIsOpen}>
                  <CreateNewQuiz setIsOpen={setIsOpen} />
                </Modal>
              )}

              {/* <button
                className="bg-red-500 rounded-full create-quiz-bt"
                onClick={() => setIsOpen(!isOpen)}
              >
                <IoMdAdd className="w-auto h-10 text-white" />
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* this code written by deepesh */}
    </>
  );
};

export default Admin;
