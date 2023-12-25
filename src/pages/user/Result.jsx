import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResultByIds } from "../../services/userQuiz.js";
import Feedback from "../../Components/Feedback/Feedback.jsx";

const Result = () => {
  const { resultId, quizId } = useParams();
  const [resultData, setResultData] = useState(null);
  const [performanceClass, setPerformanceClass] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getResultByIds({ quizId, resultId });
        console.log("Result Data: ", data);
        setResultData(data);

        const performanceClassMap = {
          Poor: "text-red-700",
          Average: "text-yellow-500",
          Good: "text-green-600",
          Excellent: "text-green-950",
        };

        setPerformanceClass(performanceClassMap[data.performance] || "");
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };

    fetchResult();
  }, [quizId, resultId]);
  return (
    <div>
      <h1>Result</h1>

      {/* {resultData && resultData.length === 0 && <h1>Not Found</h1>} */}

      {resultData && (
        <div>
          <h2>Score : {resultData.score}</h2>
          <h2>Marks : {resultData.percentage}</h2>
          <h2>
            Performance :{" "}
            <span className={`font-semibold ${performanceClass}`}>
              {resultData.performance}
            </span>
          </h2>
        </div>
      )}

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

      <Feedback />
    </div>
  );
};

export default Result;
