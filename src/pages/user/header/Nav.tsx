
import { Link } from "react-router-dom";

const Nav = ({
  name,
  path,
  icon,
  isActive,
  handleSetActiveTab,
  isOpenHeader,
}) => {
  return (
    <Link
      to={path}
      onClick={() => handleSetActiveTab(name)}
      className={`flex flex-row items-center  h-10  hover:text-gray-900 ${
        isActive ? "text-gray-900" : "text-gray-500"
      }`}
    >
      {icon}
      <p className={`${isOpenHeader ? "hidden" : ""}`}>{name}</p>
    </Link>
  );
};

export default Nav;
