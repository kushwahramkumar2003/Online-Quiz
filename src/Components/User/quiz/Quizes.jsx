import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import QuizCard from "./QuizCard";
import { getAllQuizs } from "../../../services/quiz";

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
  }, [isError, isLoading, data]);

  return (
    <div className="">
      {data &&
        data.map((quiz) => (
          <QuizCard
            key={quiz._id}
            title={quiz.name}
            desc={quiz.description}
            category={quiz.category}
            noQuestions={quiz.questions.length}
            time={quiz.time}
            quizId={quiz._id}
          />
        ))}
    </div>
  );
};

export default Quizes;
