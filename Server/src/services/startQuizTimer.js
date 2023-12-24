// Inside your quiz controller or a dedicated timer service
const quizTimers = {}; // Keep track of timers for multiple quizzes

const startQuizTimer = (quizId, duration) => {
  quizTimers[quizId] = setTimeout(async () => {
    // Fetch user-specific quiz details from the database
    const userQuiz = await UserQuiz.findOne({
      userId: req.user._id,
      quiz: quizId,
    });

    if (userQuiz) {
      // Implement logic to automatically submit the quiz
      // This could involve calling your existing submitQuizAnswers controller
      // and generating the result on the backend
      console.log(`Automatic submission for quiz ${quizId}`);

      // Delete user-specific quiz details from the database
      await UserQuiz.deleteOne({ _id: userQuiz._id });
    }
  }, duration);
};

const stopQuizTimer = (quizId) => {
  clearTimeout(quizTimers[quizId]);
  delete quizTimers[quizId];
};
