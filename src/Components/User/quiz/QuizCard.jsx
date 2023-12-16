import React from "react";

const QuizCard = ({ title, desc, category, noQuestions, time }) => {
  return (
    <div className="p-4 border border-yellow-600 rounded-lg shadow-lg bg-yellow-50">
      <h1 className="text-xl font-bold text-yellow-900">{title}</h1>
      <p className="mt-2 text-yellow-700">{desc}</p>
      <p className="mt-1 text-yellow-600">{category}</p>
      <p className="mt-1 text-yellow-500">{noQuestions}</p>
      <p className="mt-1 text-yellow-400">{time}</p>
      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 mr-2 font-bold text-white bg-yellow-600 rounded hover:bg-yellow-700">
          Start Quiz
        </button>
        {/* <button className="px-4 py-2 ml-2 font-bold text-white bg-yellow-600 rounded hover:bg-yellow-700">
          Other Button
        </button> */}
      </div>
    </div>
  );
};

export default QuizCard;
