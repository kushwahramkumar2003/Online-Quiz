
import { Link } from "react-router-dom";

const Nav = ({
  name,
  path,
  icon,
               setOpen
}) => {
  return (
    <Link
      to={path}
      onClick={()=>setOpen(false)}
      className={`flex flex-row items-center  h-10  hover:text-gray-900 `}
    >
      {icon}
      <p >{name}</p>
    </Link>
  );
};

export default Nav;
