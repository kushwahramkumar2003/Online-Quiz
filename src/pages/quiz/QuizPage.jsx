import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import OneQuestionApper from "../../Components/StartQuiz/OneQuestionApper";
import Timer from "../../Components/StartQuiz/Timer";
import QuestionAttempBar from "../../Components/StartQuiz/QuestionAttempBar";
import { useQuery } from "@tanstack/react-query";
import { getQuizById } from "../../services/quiz";
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
  // console.log("quizId : ", quizId);

  useEffect(() => {
    setIsLoading(true);
    const fetchQuiz = async () => {
      const data = await getQuizByIdForUser({ quizId });
      // console.log("Quiz Data : ", data);
      // console.log("data?.questions : ", data?.questions);
      console.log("Arrived res : ", data);
      setIsLoading(false);
      setQuestionsArr(data?.questions);
    };
    fetchQuiz();
  }, []);

  let QuizData = undefined;

  const {
    mutate: submitAnswer,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: ({ quizId, questionId, answer }) => {
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
    mutationFn: ({ quizId }) => {
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

  const submitHandler = async () => {
    console.log("quizId : ", quizId);
    await SubmitQuiz({ quizId });
  };

  const nextHandler = async ({ isNext }) => {
    await submitAnswer({
      quizId,
      questionId: QuestionsArr[questionNumber]._id,
      answer: optionSelected,
    });
    if (isNext) setQuestionNumber((prev) => prev + 1);
  };

  const prevHandler = async () => {
    await submitAnswer({
      quizId,
      questionId: QuestionsArr[questionNumber]._id,
      answer: optionSelected,
    });
    if (isSuccess) setQuestionNumber((prev) => prev - 1);
  };

  return (
    <div className="main-quiz-head">
      {isLoading ? (
        <h2 className="head">Loading </h2>
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
                selected={QuestionsArr[questionNumber]?.selected}
                setSelected={QuestionsArr[questionNumber]?.setSelected}
                correct={QuestionsArr[questionNumber]?.correct}
                setQuestionNumber={setQuestionNumber}
                setQuestions={setQuestionsArr}
                setOptionSelected={setOptionSelected}
              />

              <div>
                <Timer time={1} submitHandler={submitHandler} />
              </div>
            

            <div>
              <button
                onClick={() => prevHandler()}
                disabled={questionNumber <= 0 || isPending}
              >
                Previous
              </button>

              <button
                onClick={() => {
                  const isNext = questionNumber !== QuestionsArr.length - 1;
                  nextHandler({ isNext });
                }}
                disabled={isPending}
              >
                {questionNumber === QuestionsArr.length - 1 ? "Save" : "Next"}
              </button>
            </div>
          </div>



          <div className="question-bar">
              <QuestionAttempBar
                questionNumber={questionNumber}
                setquestionNumber={setQuestionNumber}
              />

            <button onClick={() => submitHandler()}>Submit</button>
          </div>


          </div>
        
      </div>
        )
      )}
    </div>
  );
};

export default QuizPage;
