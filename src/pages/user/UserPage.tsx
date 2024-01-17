import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Quizes from "../../Components/User/quiz/Quizes.js";
import "./User_page.css";
import Navbar from "../../Components/homePage/Navbar.js";
import images from "../../constants/images.js";
import { Link as Link2 } from "react-scroll";
import { RootState } from "../../store/types.js";

const UserPage = () => {
  const navigate = useNavigate();
  const userState = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log("User State", userState.userInfo);
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);
  return (
    <div>
      <div className="landinpage" id="start">
        <Navbar />

        {/************** Navbar end here *********************/}
        <div className="line"></div>
      </div>

      <Quizes />

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
              meet excitement !"
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
    </div>
  );
};

export default UserPage;
