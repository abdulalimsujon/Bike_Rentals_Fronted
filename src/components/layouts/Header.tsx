import { Layout } from "antd/es";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { CiDark, CiLight } from "react-icons/ci";
import { useEffect, useState } from "react";

import ReusableDropdown from "../form/Dropdown";

import { logout, selectCurrentUser } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CustomButton from "../form/CustomButton";

const { Header } = Layout;

const CustomHeader = () => {
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClick = () => {
    navigate(`/${user?.role}/profile`);
  };

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Dropdown menu items for the profile
  const profileMenuItems = [
    {
      key: "1",
      label: (
        <div
          className="text-green-700 text-lg dark:bg-slate-100 bg-slate-300 cursor-pointer"
          onClick={handleClick}
        >
          <h1>Profile</h1>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="text-green-700 text-lg dark:bg-slate-100 bg-slate-300">
          <NavLink to="/settings">Settings</NavLink>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="text-green-700 text-lg dark:bg-slate-100 bg-slate-300">
          <span onClick={handleLogout}>Logout</span>
        </div>
      ),
    },
  ];

  return (
    <Header className="fixed top-0 left-0 w-full z-50 dark:bg-gray-200 dark:text-green-700 bg-gray-800 text-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between ">
          <h1 className="text-xl font-semibold dark:text-green-700 flex-shrink-0 lg:pl-12  pr-8 ">
            Sk Bike Rentals
          </h1>
          <div className="flex items-center space-x-4  md:space-x-6">
            <div className="flex flex-shrink-0">
              <NavLink className="mr-5" to="all-bike">
                All Bikes
              </NavLink>
              <NavLink to="all-bike">Rental</NavLink>
            </div>

            <div className="flex items-center space-x-2">
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
              {user ? (
                <CustomButton
                  onClick={handleLogout}
                  className="hidden md:inline"
                >
                  Logout
                </CustomButton>
              ) : (
                <CustomButton
                  onClick={() => navigate("/registration")}
                  className="hidden md:inline"
                >
                  Register
                </CustomButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default CustomHeader;
