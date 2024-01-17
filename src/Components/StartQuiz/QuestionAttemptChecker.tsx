import "./Question_attempt_checker.css";

const QuestionAttemptChecker = ({
  questionStatus,
  questionNumber,
  setQuestionNumber,
  currentQuestionNumber,
}) => {
  const circleColor = ["bg-[#C4C4C4] font-bold", "bg-[#F3BE00] text-white font-bold", "bg-[#058005] text-white font-bold"];
  // ****** Grey ****** Yellow ****** Green ******

  return (
    <>
      <span
        onClick={() => setQuestionNumber(questionNumber - 1)}
        className={`question-circle ${
          circleColor[questionStatus]
        } ${
          currentQuestionNumber + 1 === questionNumber &&
          "border-2 border-blue-500"
        }}`}
      >
        {questionNumber}
      </span>
    </>
  );
};

export default QuestionAttemptChecker;
