import { Layout } from "antd/es";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { CiDark, CiLight } from "react-icons/ci";
import { useEffect, useState } from "react";
import CustomButton from "../form/CustomButton";
import ReusableDropdown from "../form/Dropdown";

const { Header } = Layout;

const CustomHeader = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleLogout = () => {
    // handle logout logic here
  };

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Dropdown menu items for the profile
  const profileMenuItems = [
    {
      key: "1",
      label: <NavLink to="/profile">Profile</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to="/settings">Settings</NavLink>,
    },
    {
      key: "3",
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  return (
    <Header className="fixed top-0 left-0 w-full z-50 dark:bg-gray-200 dark:text-green-700 bg-gray-800 text-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold dark:text-green-700">
            Sk Bike Rentals
          </span>
          <div className="flex items-center space-x-4 md:space-x-6">
            <NavLink to="all-bike" className="hidden md:inline">
              All Bikes
            </NavLink>
            <NavLink to="all-bike" className="hidden md:inline">
              Rental
            </NavLink>
            <div className="flex items-center space-x-2">
              <CustomButton onClick={handleLogout} className="hidden md:inline">
                Register
              </CustomButton>
              <CustomButton onClick={handleLogout} className="hidden md:inline">
                Logout
              </CustomButton>
              <span onClick={handleThemeSwitch}>
                {theme === "dark" ? (
                  <CiLight size={30} title="Switch to light mode" />
                ) : (
                  <CiDark size={30} title="Switch to dark mode" />
                )}
              </span>
              <div className="relative">
                <ReusableDropdown
                  items={profileMenuItems}
                  label={<FaUserCircle size={30} />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default CustomHeader;
