import { useNavigate } from "react-router-dom";

import FullscreenButton from "../../StartQuiz/FullscreenButton";

const QuizCard = ({ title, desc, category, noQuestions, time, quizId }) => {
  const navigate = useNavigate();

  const onStartQuiz = () => {
    navigate(`/quiz/start/${quizId}`);
  };

  return (
    <div className="p-5 mt-12 mb-12 mr-12 border border-yellow-600 rounded-lg shadow-lg w-80 bg-yellow-50 ">
      <p> Tittle : {title}</p>
      {/* <p>{title}</p> */}

      <p> Description : {desc}</p>
      {/* <p className="mt-2 text-yellow-700"></p> */}

      <p> Category : {category}</p>
      {/* <p className="mt-1 text-yellow-600"></p> */}

      <p> No. of Questions : {noQuestions}</p>
      {/* <p className="mt-1 text-yellow-500">{noQuestions}</p> */}

      <p> Time : {time} min</p>
      {/* <p className="mt-1 text-yellow-400">{time}</p> */}

      <div className="flex justify-center mt-4">
        <FullscreenButton onStartQuiz={onStartQuiz} />
      </div>
    </div>
  );
};

export default QuizCard;
