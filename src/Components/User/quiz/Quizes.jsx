import React from "react";
import QuizCard from "./QuizCard";

const Quizes = () => {
  return (
    <div className="">
      <QuizCard
        title="MERN"
        desc={"This is a MERN stack quiz"}
        category={"MERN"}
        noQuestions={"10"}
        time={"10"}
      />
    </div>
  );
};

export default Quizes;
