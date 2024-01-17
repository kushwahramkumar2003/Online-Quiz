import QuestionAttemptChecker from "./QuestionAttemptChecker";
import "./Question_attempt_bar.css"

const QuestionAttempBar = ({
  questions,
  attemptQuestions,
  setQuestionNumber,
  questionNumber,
}) => {
  // console.log("Type of : ", typeof attemptQuestions);

  const checkr = (question) => {
    if (attemptQuestions[question] !== undefined) {
      if (attemptQuestions[question] === "") return 1;
      return 2;
    }
    return 0;
  };

  return (
    <div className="quiz-attempt-bar">
      {attemptQuestions &&
        questions.map((question, index) => {
          const isAttempted = checkr(question._id);
          return (
            <QuestionAttemptChecker
              key={question?._id}
              currentQuestionNumber={questionNumber}
              questionStatus={isAttempted}
              questionNumber={index + 1}
              setQuestionNumber={setQuestionNumber}
            />
          );
        })}
    </div>
  );
};

export default QuestionAttempBar;
