import  { useEffect, useCallback } from "react";

const FullscreenButton = ({ onStartQuiz }) => {
  const handleFullscreenChange = useCallback(() => {
    if (!document.fullscreenElement) {
      // Handle exit from fullscreen, if needed
    }
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      onStartQuiz();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="px-4 py-2 font-bold text-white bg-yellow-600 rounded hover:bg-yellow-700"
    >
      Start Quiz
    </button>
  );
};

export default FullscreenButton;
