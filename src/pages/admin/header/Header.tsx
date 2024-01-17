import  { useState } from "react";
import NavLink  from "./NavLink";

const Header = () => {
  const [isActiveDashboard, setIsActiveDashboard] = useState(true);
  const [isActiveMyProfile, setIsActiveMyProfile] = useState(false);
  const [isEditQuiz, setIsEditQuiz] = useState(false);
  const [isSettingHelp, setIsSettingHelp] = useState(false);
  const [isHelp, setIsHelp] = useState(false);

  return (
    <div>
      <NavLink
        // activeClass={""}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
        dashboardState={{ isActiveDashboard, setIsActiveDashboard }}
        myProfileState={{ isActiveMyProfile, setIsActiveMyProfile }}
        editQuizState={{ isEditQuiz, setIsEditQuiz }}
        settingHelpState={{ isSettingHelp, setIsSettingHelp }}
        helpState={{ isHelp, setIsHelp }}
      />
      
    </div>
  );
};

export default Header;
