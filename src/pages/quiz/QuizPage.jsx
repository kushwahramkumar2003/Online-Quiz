import React from "react";
import OneQuestionApper from "../../Components/StartQuiz/OneQuestionApper";
import Timer from "../../Components/StartQuiz/Timer";
import QuestionAttempBar from "../../Components/StartQuiz/QuestionAttempBar";
import { useQuery } from "@tanstack/react-query";
import { getQuizById } from "../../services/quiz";
import { useParams } from "react-router-dom";

const QuizPage = () => {
  const { quizId } = useParams();
  // console.log("quizId : ", quizId);

  const { data } = useQuery({
    queryFn: () => getQuizById(quizId),
    queryKey: ["quiz", quizId],
    onSuccess: (data) => {
      console.log("data : ", data);
    },
  });

  return (
    <div>
      <div>
        <OneQuestionApper />
        <div>
          
          <Timer />
          <QuestionAttempBar />
        </div>
      </div>
      <div>
        <button>Previous</button>
        <button>Submit</button>
        <button>Next</button>
      </div>
    </div>
  );
};

export default QuizPage;
