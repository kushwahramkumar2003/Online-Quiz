
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
      className={`flex flex-row items-center hover:text-slate-500 gap-3 hover:bg-cyan-100 rounded-lg justify-start p-4`}
    >
    <div className={"text-2xl text-blue-600 font-bold"}>  {icon}</div>
      <p className={"text-2xl font-bold text-gray-800"}>{name}</p>
    </Link>
  );
};

export default Nav;
