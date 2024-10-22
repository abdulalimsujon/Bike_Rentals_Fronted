import { Layout, Drawer } from "antd/es";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { CiDark, CiLight } from "react-icons/ci";
import { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import ReusableDropdown from "../form/Dropdown";
import { logout, selectCurrentUser } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CustomButton from "../form/CustomButton";

const { Header } = Layout;

const CustomHeader = () => {
  const [theme, setTheme] = useState("dark");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleLogout = () => {
    if (user) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };

  const handleEditProfile = () => {
    navigate(`/${user?.role}/edit-profile`);
  };

  const handleProfileClick = () => {
    navigate(`/${user?.role}/profile`);
  };

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleMyRentalClick = () => {
    if (user) {
      navigate(`/${user?.role}/my-rental`);
    } else {
      navigate("/login");
    }
  };

  const handleAboutClick = () => {
    navigate(`/about`);
  };

  const profileMenuItems = [
    {
      key: "1",
      label: (
        <div
          className="text-green-700 text-lg dark:bg-slate-100 bg-slate-300 cursor-pointer"
          onClick={handleProfileClick}
        >
          Profile
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="text-green-700 text-lg dark:bg-slate-100 bg-slate-300 cursor-pointer"
          onClick={handleEditProfile}
        >
          Edit Profile
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className="text-green-700 text-lg dark:bg-slate-100 bg-slate-300 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </div>
      ),
    },
  ];

  return (
    <Header className="fixed top-0 left-0 w-full z-50 dark:bg-gray-300 bg-gray-900 dark:text-white">
      <div className="container mx-auto px-2 py-4">
        <div className="flex items-center justify-between">
          {/* Drawer button placed on the left side, vertically centered */}
          <div className="md:hidden mr-4 flex items-center text-green-700 hover:text-green-900">
            <MenuOutlined
              className="text-xl cursor-pointer"
              onClick={() => setDrawerOpen(true)}
            />
          </div>

          {/* Center the title/logo, vertically aligned */}
          <h1 className="text-base md:text-xl font-semibold flex-shrink-0 text-green-700 mx-auto flex items-center">
            Sk Bike Rentals
          </h1>

          {/* Right-side links and actions, vertically aligned */}
          <div className="flex items-center space-x-2 md:space-x-6">
            <div className="hidden md:flex items-center space-x-2 md:space-x-4">
              <NavLink
                className={({ isActive }) =>
                  `text-sm md:text-lg text-green-300 dark:text-green-700 hover:text-white transition ${
                    isActive ? "underline" : ""
                  }`
                }
                to={`/home`}
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-sm md:text-lg text-green-300 dark:text-green-700 hover:text-white transition ${
                    isActive ? "underline" : ""
                  }`
                }
                to={`/all-bike`}
              >
                All Bikes
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-sm md:text-lg text-green-300 dark:text-green-700 hover:text-white transition ${
                    isActive ? "underline" : ""
                  }`
                }
                to={user ? `/${user?.role}/dashboard` : "/login"}
              >
                Dashboard
              </NavLink>
              <span
                className="cursor-pointer text-sm md:text-lg text-green-300 dark:text-green-700 hover:text-white transition"
                onClick={handleMyRentalClick}
              >
                My Rental
              </span>
              <span
                className="cursor-pointer text-sm md:text-lg text-green-300 dark:text-green-700 hover:text-white transition"
                onClick={handleAboutClick}
              >
                About
              </span>
            </div>

            <div className="flex items-center space-x-2 text-green-300 dark:text-green-700">
              {/* Theme Switch */}
              <span onClick={handleThemeSwitch} className="cursor-pointer">
                {theme === "dark" ? (
                  <CiLight size={24} title="Switch to light mode" />
                ) : (
                  <CiDark size={24} title="Switch to dark mode" />
                )}
              </span>

              {/* Profile Dropdown */}
              <ReusableDropdown
                items={profileMenuItems}
                label={<FaUserCircle size={24} />}
              />

              {/* Login/Logout Button */}
              <CustomButton
                onClick={handleLogout}
                className="hidden md:inline-block"
              >
                {user ? "Logout" : "Login"}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer for mobile view */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width="70%" // Adjusted for smaller screen sizes
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-3 space-y-3">
          <NavLink
            className={({ isActive }) =>
              ` className="text-base text-green-700 hover:bg-gray-200 transition p-2 block rounded-md" ${
                isActive ? "underline" : ""
              }`
            }
            to={`/home`}
          >
            Home
          </NavLink>

          <span
            className="text-base text-green-700 hover:bg-gray-200 transition p-2 block rounded-md"
            onClick={handleAboutClick}
          >
            About
          </span>
          <NavLink
            to={`/all-bike`}
            onClick={() => setDrawerOpen(false)}
            className="text-base text-green-700 hover:bg-gray-200 transition p-2 block rounded-md"
          >
            All Bikes
          </NavLink>
          <NavLink
            to={user ? `/${user?.role}/dashboard` : "/login"}
            onClick={() => setDrawerOpen(false)}
            className="text-base text-green-700 hover:bg-gray-200 transition p-2 block rounded-md"
          >
            Dashboard
          </NavLink>
          <span
            onClick={() => {
              setDrawerOpen(false);
              handleMyRentalClick();
            }}
            className="text-base text-green-700 cursor-pointer hover:bg-gray-200 transition p-2 block rounded-md"
          >
            My Rental
          </span>
        </div>
      </Drawer>
    </Header>
  );
};

export default CustomHeader;
