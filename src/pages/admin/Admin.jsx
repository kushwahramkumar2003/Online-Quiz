import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllQuizs } from "../../services/quiz";
import QuizCard from "../../Components/Admin/QuizCard";
import { IoMdAdd } from "react-icons/io";
import Modal from "../../Components/modal/Modal";
import CreateNewQuiz from "../../Components/Admin/CreateNewQuiz";
import   "./Admin.css";  
import images from "../../constants/images.js";



const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [quiz, setQuiz] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const userState = useSelector((state) => state.user);

  // const { data } = useQuery();

  useEffect(() => {
    const role = userState?.userInfo?.user?.role;

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
   <div className="admin-page"> 

     <div className="Admin-manu"> 
         <div className="Grad-logo">  
         <img src={images.logo} alt="MyProfile" id="Admin-icon"></img>
         </div> 

       <div className="admin-box"> 
       <img src={images.MyProfile} alt="MyProfile" id="Admin-icon"></img>
       <p>My Profile</p> 
       </div> 

       <div className="admin-box"> 
       <img src={images.CreateQuiz} alt="CreateQuiz" id="Admin-icon"></img>
       <p>Create Quiz</p> 
       </div> 

       <div className="admin-box"> 
       <img src={images.Update} alt="updates" id="Admin-icon"></img>
       <p>Edit Quiz</p> 
       </div>

       <div className="admin-box"> 
       <img src={images.Help} alt="help" id="Admin-icon"></img>
       <p>Help</p> 
       </div>

       <div className="admin-box"> 
       <img src={images.Setting} alt="setting" id="Admin-icon"></img>
       <p>Settings</p> 
       </div> 


       <div className="admin-box"> 
       <img src={images.Logout} alt="logout" id="Admin-icon"></img>
       <p>Logout</p> 
       </div>

     </div>  
 
   <div className="admin-right-page"> 

     <div className="admin-navbar">  

       <div className="admin-name">  
           <p>Admin</p>
       </div> 
       <div className="admin-logo-right">
       <img src={images.MyProfile} alt="MyProfile" id="Admin-icon"></img> 
       </div> 
       
     </div>  

     <div className="admin-content"> 
     </div> 

     </div> 

     </div>

    

     <div className="line2"></div>

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
