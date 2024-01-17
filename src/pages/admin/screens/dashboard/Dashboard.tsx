import images from "../../../../constants/images";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-heading">
        <h1>My Profile</h1>
      </div>

      <div className="quiz-starts-info">
        <div>
          <h3 id="stats-head">Quiz Starts</h3>
          {/* Select quiz bar */}
        </div>

        <div className="quiz-stats-main">
          <div className="quiz-same-stats">
            <div id="no_particip">
              <img
                src={images.NoOfParticipants}
                id="partici"
                alt="participants"
              ></img>
            </div>
            <div className="quiz-stats-descrip">
              <p>Number of Participants</p>
              <h1>1234</h1>
            </div>
          </div>

          <div className="quiz-same-stats">
            <div id="avg-sco-img">
              <img src={images.AvgScore} id="avgscore" alt="quiz"></img>
            </div>
            <div className="quiz-stats-descrip">
              <p>Average Socre</p>
              <h1>1234</h1>
            </div>
          </div>

          <div className="quiz-same-stats">
            <div id="avg-time-img">
              <img src={images.AvgTime} id="avgtime" alt="quiz"></img>
            </div>
            <div className="quiz-stats-descrip">
              <p>Average Time</p>
              <h1>2m 33s</h1>
            </div>
          </div>

          <div className="quiz-same-stats">
            <div id="quiz-name-img">
              <img src={images.QuizName} id="quizName" alt="quiz"></img>
            </div>
            <div className="quiz-stats-descrip">
              <p>Quzi Name</p>
              <h1>Basics of IT</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="user-quiz-stats"></div>
    </div>
  );
};

export default Dashboard;
