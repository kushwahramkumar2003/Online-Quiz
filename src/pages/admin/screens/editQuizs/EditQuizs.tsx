import { useEffect, useState } from "react";
import { getAllQuizs } from "../../../../services/quiz";
import QuizCard from "../../../../Components/Admin/QuizCard";

const EditQuizs = () => {
  const [quiz, setQuiz] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("EditQuiz");
    setIsLoading(true);
    async function fetchData() {
      const quizArr = await getAllQuizs();
      console.log("Quiz Arr", quizArr);
      setQuiz(quizArr);
      setIsLoading(false);
    }
    fetchData();
  }, [refresh]);

  return (
    <div className="admin-content">
      <div className="quiz-create-box ">
        {/* <h2>All Quizes</h2> */}

        <div className="w-auto h-full quiz-box-coming">
          {isLoading && (
            <div className="flex items-center justify-center w-auto h-full">
              <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          )}
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

        {/* <button
      className="bg-red-500 rounded-full create-quiz-bt"
      onClick={() => setIsOpen(!isOpen)}
    >
      <IoMdAdd className="w-auto h-10 text-white" />
    </button> */}
      </div>
    </div>
  );
};

export default EditQuizs;
