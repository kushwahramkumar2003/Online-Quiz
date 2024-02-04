import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import OneQuestionApper from "../../Components/StartQuiz/OneQuestionApper";
import Timer from "../../Components/StartQuiz/Timer";
import QuestionAttempBar from "../../Components/StartQuiz/QuestionAttempBar";
// import { useQuery } from "@tanstack/react-query";
// import { getQuizById } from "../../services/quiz";
import { useParams, useNavigate } from "react-router-dom";
import {
  getQuizByIdForUser,
  submitOneQuestion,
  submitQuiz,
} from "../../services/userQuiz";
import { toast } from "react-hot-toast";
import "./Quiz_page.css";

const QuizPage = () => {
  const navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [QuestionsArr, setQuestionsArr] = useState([]);
  const [optionSelected, setOptionSelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { quizId } = useParams();
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState(null);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userQuizAlredyStarted, setUserQuizAlredyStarted] = useState({});
  const [attemptQuestions, setAttemptQuestions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true);
      const data = await getQuizByIdForUser({ quizId });
      // console.log("Quiz Data : ", data);
      // console.log("data?.questions : ", data?.questions);
      console.log("Arrived res : ", data);
      if (data?.quizData) {
        setIsLoading(false);
        setQuestionsArr(data?.quizData.questions);
        setDuration(data?.quizData.duration);
        setTitle(data?.quizData?.title);
      } else {
        setIsLoading(false);
        setQuestionsArr(data?.questions);
        setDuration(data?.duration);
      }
      if (data?.userQuizAlredyStarted) {
        setUserQuizAlredyStarted(data?.userQuizAlredyStarted);
        setAttemptQuestions(data?.userQuizAlredyStarted?.answers);
      }
    };
    fetchQuiz();
  }, [quizId]);

  // let QuizData = undefined;

  const {
    mutate: submitAnswer,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: ({ quizId, questionId, answer }:{quizId:string,questionId:string,answer:string}) => {
      return submitOneQuestion({ quizId, questionId, answer });
    },
    onSuccess: (data) => {
      // setQuestionNumber((prev) => prev + 1);
      toast.success("Answer added successfully");
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { mutate: SubmitQuiz, isPending: isPendingSubmit } = useMutation({
    mutationFn: ({ quizId }:{quizId:string}) => {
      return submitQuiz({ quizId });
    },
    onSuccess: (data) => {
      // setQuestionNumber((prev) => prev + 1);

      const { result } = data;
      toast.success("Quiz submitted successfully");
      console.log("result data : ", data);
      navigate(`/quiz/result/${quizId}/${result?._id}`);
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  console.log(isPendingSubmit);

  const submitHandler = async () => {
    setLoading(true);
    console.log("quizId : ", quizId);
    await SubmitQuiz({ quizId });
    // setOptionSelected("");
    setLoading(false);
  };

  const nextHandler = async ({ isNext }) => {
    setLoading(true);
    await submitAnswer({
      quizId,
      questionId: QuestionsArr[questionNumber]._id,
      answer: optionSelected,
    });

    const obj = { [QuestionsArr[questionNumber]._id]: optionSelected };

    setAttemptQuestions((prev) => Object.assign({}, prev, obj));
    console.log("Attempt Questions : ", attemptQuestions);
    if (isNext) {
      setOptionSelected(
        attemptQuestions[QuestionsArr[questionNumber]?._id]
          ? attemptQuestions[QuestionsArr[questionNumber]?._id]
          : ""
      );
      setQuestionNumber((prev) => prev + 1);
    }
    setLoading(false);
  };

  const prevHandler = async () => {
    setLoading(true);
    await submitAnswer({
      quizId,
      questionId: QuestionsArr[questionNumber]._id,
      answer: optionSelected,
    });
    if (isSuccess) {
      setOptionSelected(
        attemptQuestions[QuestionsArr[questionNumber]?._id]
          ? attemptQuestions[QuestionsArr[questionNumber]?._id]
          : ""
      );
      setQuestionNumber((prev) => prev - 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    setOptionSelected(
      attemptQuestions[QuestionsArr[questionNumber]?._id]
        ? attemptQuestions[QuestionsArr[questionNumber]?._id]
        : ""
    );
  }, [questionNumber, attemptQuestions, QuestionsArr]);

  return (
    <div className="main-quiz-head">
      {isLoading ? (
        <div className="w-full h-4 mb-4 shimmer animate-shimmer"></div>
      ) : (
        QuestionsArr && (
          <div>
            <p className="main-heading-Quiz"> OBJECTIVE QUESTIONS</p>
            <div className="bottom-line"></div>

            <div className="main_2-quiz">
              <div className="quiz-items">
                <OneQuestionApper
                  question={QuestionsArr[questionNumber]?.text}
                  questionNumber={questionNumber + 1}
                  totalQuestions={QuestionsArr.length}
                  options={QuestionsArr[questionNumber]?.options}
                  selected={optionSelected}
                  correct={QuestionsArr[questionNumber]?.correct}
                  setQuestionNumber={setQuestionNumber}
                  setQuestions={setQuestionsArr}
                  setOptionSelected={setOptionSelected}
                />

                <div className="quiz-Timer">
                  <Timer time={duration || 10} submitHandler={submitHandler} />
                </div>

                <div className="quiz-btns ">
                  <button
                    className="prev-btn disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => prevHandler()}
                    disabled={loading || questionNumber <= 0 || isPending}
                  >
                    Previous
                  </button>

                  <button
                    className="next-btn disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      const isNext = questionNumber !== QuestionsArr.length - 1;
                      nextHandler({ isNext });
                    }}
                    disabled={isPending || loading}
                  >
                    {questionNumber === QuestionsArr.length - 1
                      ? "Save"
                      : "Next"}
                  </button>
                </div>

                <div className="submit-quiz-btn">
                  <button
                    disabled={loading || isPending || isPendingSubmit}
                    className="submit-btn disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => submitHandler()}
                  >
                    Submit
                  </button>
                </div>
              </div>

              <div className="question-bar">
                <h2 className="type-quiz-going-on">{title} Questions </h2>
                <div className="line-quiz-category"></div>
                <QuestionAttempBar
                  questionNumber={questionNumber}
                  questions={QuestionsArr}
                  attemptQuestions={attemptQuestions}
                  setQuestionNumber={setQuestionNumber}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default QuizPage;
