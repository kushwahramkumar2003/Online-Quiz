

const QuizCardShimmer = () => {
  return (
    <div className="relative p-5 mt-12 mb-12 mr-12 border rounded-lg shadow-lg w-80 bg-yellow-50">
      <div className="absolute w-full h-4 bg-gray-200 rounded shimmer"></div>
      <p className="mt-6">
        <span className="block w-1/2 h-4 bg-gray-200 rounded shimmer"></span>
        <span className="block w-1/4 h-4 mt-2 bg-gray-200 rounded shimmer"></span>
      </p>
      <p className="mt-6">
        <span className="block w-1/2 h-4 bg-gray-200 rounded shimmer"></span>
        <span className="block w-1/4 h-4 mt-2 bg-gray-200 rounded shimmer"></span>
      </p>
      <p className="mt-6">
        <span className="block w-1/2 h-4 bg-gray-200 rounded shimmer"></span>
        <span className="block w-1/4 h-4 mt-2 bg-gray-200 rounded shimmer"></span>
      </p>
    </div>
  );
};

export default QuizCardShimmer;
