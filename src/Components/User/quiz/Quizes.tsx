import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import QuizCard from "./QuizCard";
import { getAllQuizs } from "../../../services/quiz";
import "./Quizes.css";
import QuizCardShimmer from "./QuizCardShimmer";

const Quizes = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryFn: () => getAllQuizs(),
    queryKey: ["quizs"],
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.name, { duration: 4000 });
    }
    console.log("data : ", data);
    // eslint-disable-next-line
  }, [isError, isLoading, data]);

  const shimmerArr = [1, 2, 3, 4];

  return (
    <div className="flex flex-wrap Main-quiz ">
      <div className="tag-line">
        <h2> Unleash Your Knowledge, Ignite Your Curiosity </h2>
        <h3> Elevate Learning with Our Dynamic</h3>
        <h3> Quiz Experience! </h3>
      </div>

      <div className="quiz-message">
        <p> Pick a category, quiz your way to knowledge! </p>
      </div>

      <div className="quiz-content">
        <div className="quiz-box ">
          {isLoading &&
            shimmerArr.map(( index) => (
              <QuizCardShimmer key={index.toString()} />
            ))}
          {data &&
            data.map((quiz) => (
              <QuizCard
                // className="w-10"
                key={quiz._id}
                title={quiz.name}
                desc={quiz.description}
                category={quiz.category}
                noQuestions={quiz.questions.length}
                time={quiz.duration}
                quizId={quiz._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Quizes;
