import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResultByIds } from "../../services/userQuiz.js";

const Result = () => {
  const { resultId, quizId } = useParams();
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const data = await getResultByIds({ quizId, resultId });
      console.log("Result Data : ", data);
      setResultData(data);
    };
    fetchResult();
  }, []);
  return (
    <div>
      <h1>Result</h1>

      {/* {resultData && resultData.length === 0 && <h1>Not Found</h1>} */}

      {resultData && <h2>Score : {resultData.score}</h2>}

      {/* {resultData &&
        resultData.map((item) => {
          return (
            <div>
              <h3>{item.question}</h3>
              <h4>{item.correctAnswer}</h4>
              <h4>{item.userAnswer}</h4>
            </div>
          );
        })} */}
    </div>
  );
};

export default Result;
