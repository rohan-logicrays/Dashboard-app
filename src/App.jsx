import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import { useState } from "react";
import DashBoard from "./pages/DashBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notification from "./components/Notification";
import ProfileOptions from "./components/ProfileOptions";
import Settings from "./pages/Settings";

function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [isProfile, setIsProfile] = useState(false);
  const [isNotifiaction, setisNotifiaction] = useState(false);

  const handleProfileClick = () => {
    setIsProfile(!isProfile);
  };

  const handleLogoClick = () => {
    setIsVisible(!isVisible);
  };
  const handleNotificationClick = () => {
    setisNotifiaction(!isNotifiaction);
  };

  return (
    <BrowserRouter>
      <TopBar
        handleLogoClick={handleLogoClick}
        isVisible={isVisible}
        handleNotificationClick={handleNotificationClick}
        handleProfileClick={handleProfileClick}
      />
      <SideBar isVisible={isVisible}  />
      <ProfileOptions isProfile={isProfile}  />
      <Notification isNotifiaction={isNotifiaction}/>
      <Routes>
        <Route
          path="/dashboard"
          element={<DashBoard isVisible={isVisible}  />}
        />
        <Route path="/settings" element={<Settings isVisible={isVisible}  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
