import Menu from "../assets/menu.png";
import Profile from "../assets/profile.png";
import NotificationIcon from "../assets/notification.png";

import closeMenu from "../assets/left-arrow.png";
import { useSelector } from 'react-redux';

const TopBar = ({ handleLogoClick, isVisible ,handleNotificationClick,handleProfileClick }) => {
  const theme = useSelector((state) => state.theme.value);

  return (
    
    <div className="flex flex-col md:flex-col h-1/2 ">
  <div className={`bg-${theme}-400 flex justify-between items-center w-full  h-16 absolute z-10 shadow-lg  md:shadow-none`}>
    <section className="ml-2">
      {isVisible ? (
        <img
          src={closeMenu}
          alt=""
          onClick={() => handleLogoClick()}
          className="h-8 ease-in-out duration-300 cursor-pointer"
        />
      ) : (
        <img
          src={Menu}
          alt=""
          onClick={() => handleLogoClick()}
          className="h-8 ease-in-out duration-300 cursor-pointer"
        />
      )}
    </section>
    <section>
      <span className="text-xl">Dashboard</span>
    </section>
    <section className="sm:hidden md:block lg:block ">
      <div className="w-full max-w-sm">
        <input
          type="text"
          className="rounded-lg focus:outline-none p-1 mx-1 border-2 border-red-400"
          placeholder="Search..."
        />
      </div>
    </section>
    <section className="flex items-center mx-2 ">
      <section className={`max-w-[12rem] flex bg-${theme}-100 p-1 rounded-xl mx-1 cursor-pointer`}  onClick={() => handleProfileClick()}>
        <img src={Profile} alt="" className="h-12"/>
        <section className="grid truncate ">
          <span>Rohan Vaseta</span>
          <span>21</span>
        </section>
      </section>
      <section className="flex cursor-pointer" onClick={() => handleNotificationClick()}>
        <img src={NotificationIcon} alt="" className="h-9 relative z-0" />
        <span className="absolute z-10 right-3 h-3 w-3 rounded-full bg-red-600 "></span>
      </section>
    </section>
  </div>
 
 
</div>

  );
};

export default TopBar;
