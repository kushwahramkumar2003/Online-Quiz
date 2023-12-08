import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllQuizs } from "../../services/quiz";
import QuizCard from "../../Components/Admin/QuizCard";

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [quiz, setQuiz] = React.useState([]);

  const userState = useSelector((state) => state.user);

  // const { data } = useQuery();

  useEffect(() => {
    const role = userState.userInfo.user.role || userState.userInfo.data.role;

    if (!userState.userInfo || !(role === "ADMIN")) {
      navigate("/");
    }
  }, [quiz, userState.userInfo, navigate]);
  useEffect(() => {
    async function fetchData() {
      const quizArr = await getAllQuizs();
      console.log("Quiz Arr", quizArr);
      setQuiz(quizArr);
    }
    fetchData();
  }, []);
  return (
    <>
      <h2>All Quizes</h2>
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
          />
        );
      })}
    </>
  );
};

export default Admin;
