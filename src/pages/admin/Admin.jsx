import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllQuizs } from "../../services/quiz";
import QuizCard from "../../Components/Admin/QuizCard";
import { IoMdAdd } from "react-icons/io";
import Modal from "../../Components/modal/Modal";
import CreateNewQuiz from "../../Components/Admin/CreateNewQuiz";

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [quiz, setQuiz] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const userState = useSelector((state) => state.user);

  // const { data } = useQuery();

  useEffect(() => {
    // console.log("User State", userState.userInfo.role);
    const role = userState?.userInfo?.role;

    if (!role) {
      navigate("/");
    }

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
  return (
    <> 
 
  {/* this code written by deepesh */}  


     <div className="AdminPage">  

     <div className="sections"> 
      <ul className="aminSections"> 
        <li>Logo</li>
        <li>My Profile</li>
        <li>Create Quiz</li>
        <li>Edit Quiz</li>
        <li>Help</li> 
        <li>Settings</li>
        <li>Logout</li>
      </ul>
     </div> 

     </div>  

     {/* this code written by deepesh */}  


      <h2>All Quizes</h2>
      <div>
        {quiz.map((q) => {
          return (
            <QuizCard
              title={q.title}
              category={q.category}
              description={q.description}
              times_taken={q.times_taken}
              quiz_id={q._id}
              questions={q.questions.length}
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

      <button
        className="bg-red-500 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoMdAdd className="w-auto h-10 text-white" />
      </button>
    </>
  );
};

export default Admin;
