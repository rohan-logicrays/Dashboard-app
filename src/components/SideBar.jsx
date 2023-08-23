import { Link,useLocation} from "react-router-dom";
import Settings from "../assets/settings.png";
import { useSelector } from 'react-redux';
const SideBar = ({ isVisible }) => {
  const theme = useSelector((state) => state.theme.value);
  const location = useLocation()
  return (
    <div
      className={`w-full sm:w-1/5  fixed z-0 left-0 duration-200 ease-in-out rounded ${
        isVisible ? "translate-x-0 opacity-1" : "-translate-x-full opacity-0"
      } sm:h-1/2 md:h-screen lg:h-screen grid justify-center bg-${theme}-500 p-2`}
    ><div className="h-2/3 grid ">
      <section className="flex justify-center h-6 w-full"></section>
      <section className="flex justify-center h-6 w-full"></section>
      <Link to="/dashboard">
        <section
          className={`w-16 md:w-32 lg:w-52 text-sm md:text-md lg:text-lg  flex cursor-pointer rounded-lg items-center justify-center h-12 bg-${theme}-700 hover:bg-${theme}-600 text-white ${location.pathname === "/dashboard"?'border-2':''} hover:outline outline-offset-2 hover:border-none`}
        >
          Dashboard
        </section>
      </Link>
      <section
        className={`w-16 md:w-32 lg:w-52 text-sm md:text-md lg:text-lg  flex  cursor-pointer rounded-lg items-center justify-center h-12 bg-${theme}-700  hover:bg-${theme}-600 text-white`}
      >
        Messages
      </section>

      <section
        className={`w-16 md:w-32 lg:w-52 text-sm md:text-md lg:text-lg  flex cursor-pointer rounded-lg items-center justify-center h-12 bg-${theme}-700  hover:bg-${theme}-600 text-white`}
      >
        Projects
      </section>

      <section
        className={`w-16 md:w-32 lg:w-52 text-sm md:text-md lg:text-lg flex cursor-pointer  rounded-lg items-center justify-center h-12 bg-${theme}-700  hover:bg-${theme}-600 text-white`}
      >
        Analytics
      </section>
      <Link to="/settings">
        <section
          className={`w-16 md:w-32 lg:w-52 text-sm md:text-md lg:text-lg   flex cursor-pointer rounded-lg items-center justify-center h-12 bg-${theme}-700  hover:bg-${theme}-600 text-white ${location.pathname === "/settings"?'border-2':''} hover:outline outline-offset-2 hover:border-none`}
        >
          <img src={Settings} alt="" className="h-6 mr-2" />
          Settings
        </section>
      </Link>
      </div>
    </div>
  );
};

export default SideBar;
