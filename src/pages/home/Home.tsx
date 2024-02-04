// import { Link } from "react-router-dom";
import { Link as Link2 } from "react-scroll";

import "./navbar.css";
import Navbar from "../../Components/homePage/Navbar.js";
import images from "../../constants/images.js";

// navbar start here
const Home = () => {
  return (
    <>
      {/***************** Page 1 start here ******************/}

      <div className="landinpage" id="start">
        <Navbar />

        {/************** Navbar end here *********************/}
        <div className="line"></div>

        {/************** Main Content here *********************/}

        <div className="main">
          <div className="container">
            <h4 className="text-4xl font-bold" id="text1">
              Learn{" "}
              <span className="text-cyan-600">
                <br />
              </span>
              <span>new concepts</span>
              <br />
              for each question
            </h4>

            <p id="text2">We help you prepare for exams and quizes</p>

            <button className="h-12 mt-8 w-28 " id="startbt">
              Start solving
            </button>
          </div>

          <div className="home-img">
            <img src={images.rightimg} id="homeImage" alt="homeImg"></img>
          </div>
        </div>
      </div>

      {/* <div className="line2"></div> */}

      {/***************** How does it Works? page **********************************/}
      <div className="page-2" id="works">
        <div className="how-it-work">
          <h2> How does it works?</h2>
        </div>

        <div className="time-line-page-2">
          <div className="timeline">
            <div className="timeline__component"></div>

            <div className="timeline__middle">
              <div className="timeline__point"></div>
            </div>

            <div
              className="timeline__component timeline__component--bg"
              id="work-card-1"
            >
              <h2 className="timeline__title"> User Registration/Login </h2>
              <p className="timeline__paragraph">
                Seamlessly log in or register to establish your personalized
                account, unlocking a tailored quiz experience.
              </p>
            </div>

            <div
              className="timeline__component timeline__component--bg"
              id="work-card-2"
            >
              <h2 className="timeline__title">Explore Quiz Categories </h2>
              <p className="timeline__paragraph">
                Navigate through diverse quiz categories based on your interests
                or specific skill focus, ensuring a personalized and engaging
                quiz selection.
              </p>
            </div>

            <div className="timeline__middle">
              <div className="timeline__point"></div>
            </div>

            <div className="timeline__component"></div>

            <div className="timeline__component"></div>

            <div className="timeline__middle">
              <div className="timeline__point"></div>
            </div>

            <div
              className="timeline__component timeline__component--bg"
              id="work-card-3"
            >
              <h2 className="timeline__title">Real-time Feedback </h2>
              <p className="timeline__paragraph">
                Receive instant feedback for each question, providing immediate
                clarity on the correctness of your responses.
              </p>
            </div>

            <div
              className="timeline__component timeline__component--bottom timeline__component--bg"
              id="work-card-4"
            >
              <h2 className="timeline__title">Completion and Results </h2>
              <p className="timeline__paragraph">
                Instantly access a comprehensive result summary upon completing
                a quiz, offering insights into your performance.
              </p>
            </div>

            <div className="timeline__middle">
              <div className="timeline__point"></div>
              <div className="timeline__point timeline__point--bottom"></div>
            </div>
          </div>
        </div>
      </div>

      {/******************** Our Features & Services Page **********************/}

      <div className="features">
        <h2>Our features & Services</h2>
      </div>

      {/****** new work for section card  start here ******/}
      <div className="parent-box">
        <div className="card_items">
          <div className="card-content-2" id="cds-1">
            <img
              src={images.feature_1}
              alt="feature-img-2"
              id="feature-img-2"
            ></img>
            <h2>Diverse Language Coverage </h2>
            <p>
              Explore quizzes covering a variety of programming languages,
              Aptitude, Reasoning Challenges and more.
            </p>
          </div>
        </div>

        <div className="card_items">
          <div className="card-content-2" id="cds-2">
            <img
              src={images.feature_2}
              id="feature-img-2"
              alt="feature-img-2"
            ></img>
            <h2>Personalized Skill Profiles </h2>
            <p>
              Track your progress in each category, allowing you to identify
              strengths and areas for improvement.
            </p>
          </div>
        </div>

        <div className="card_items">
          <div className="card-content-2" id="cds-3">
            <img
              src={images.feature_5}
              alt="feature-img-2"
              id="feature-img-2"
            ></img>
            <h2> Timed Programming Quizzes</h2>
            <p>
              Practice time management in coding with quizzes featuring
              realistic time constraints.
            </p>
          </div>
        </div>

        <div className="card_items">
          <div className="card-content-2" id="cds-4">
            <img
              src={images.feature_4}
              alt="feature-img-2"
              id="feature-img-2"
            ></img>
            <h2>Feedback for Improvement </h2>
            <p>
              {" "}
              Leverage detailed feedback to enhance your knowledge and refine
              your problem-solving strategies.
            </p>
          </div>
        </div>

        <div className="card_items">
          <div className="card-content-2" id="cds-5">
            <img
              src={images.feature_3}
              alt="feature-img-2"
              id="feature-img-2"
            ></img>
            <h2>Detailed Explanations </h2>
            <p>
              {" "}
              Understand the reasoning behind correct answers with comprehensive
              explanations, facilitating a deeper understanding of concepts.
            </p>
          </div>
        </div>

        <div className="card_items">
          <div className="card-content-2" id="cds-6">
            <img
              src={images.feature_6}
              alt="feature-img-2"
              id="feature-img-2"
            ></img>
            <h2>Aptitude Speed Challenges </h2>
            <p>
              Enhance your speed and accuracy in aptitude and reasoning with
              timed challenges.
            </p>
          </div>
        </div>
      </div>
      {/********** new work for section card  end  here ******/}

      {/********** features & services end here ***********/}

      {/****************** footer section start here ******************/}

      <footer>
        <div className="footerBox">
          {/************ Box - 1 ****************/}
          <div className="section1" id="footer-box-1">
            <Link2
              to={"start"}
              spy={true}
              smooth={true}
              activeClass="deactive"
              duration={500}
              className="hover:cursor-pointer"
            >
              <img src={images.capLogo} alt="Footer-Logo" id="footerlogo"></img>
            </Link2>

            <h3>Home | About | Contact | Quizes</h3>
            <p>Copyright @2023 QuizGrad All right reserved</p>
          </div>

          {/************ Box - 2 ****************/}
          <div className="section1" id="footer-box-2">
            <div className="box1">
              <img src={images.location} alt="location" id="footer-icon"></img>
              <p>Bhopal M.P</p>
            </div>

            <div className="box1">
              <img src={images.phone} alt="phone" id="footer-icon"></img>
              <p>+91 98******12</p>
            </div>

            <div className="box1">
              <img src={images.email} alt="emailId" id="footer-icon"></img>
              <p>QuizGrad123@gmail.com</p>
            </div>
          </div>

          {/************ Box - 3 ****************/}
          <div className="section1" id="footer-box-3">
            <h2>About the QuizGrad</h2>
            <p>
              Quizgrad is a web app which provide a variety of quizzes! Explore
              engaging challenges in programming, aptitude, reasoning, and more.
              Elevate your knowledge effortlessly at Quizgrad - where learning
              meets excitement !"
            </p>

            <div className="contacts">
              <img src={images.fb} alt="facebook" id="footer-icon"></img>
              <img src={images.ld} alt="linkedin" id="footer-icon"></img>
              <img src={images.insta} alt="Instagram" id="footer-icon"></img>
              <img src={images.twitter} alt="twitter" id="footer-icon"></img>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
