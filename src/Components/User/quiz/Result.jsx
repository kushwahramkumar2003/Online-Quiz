import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getResultByIds } from "../../../services/userQuiz";

const Result = () => {
  const { resultId, quizId } = useParams();

  

  useEffect(() => {
    const fetchResult = async () => {
      const data = await getResultByIds({ quizId, resultId });
      console.log("Result Data : ", data);
    };
    fetchResult();
  }, []);

  return <div>


  </div>;
};

export default Result;
