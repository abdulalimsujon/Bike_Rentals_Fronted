import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="pb-16">
      <header className="h-20 w-full bg-amber-500 fixed z-[999] text-xl">
        <nav className="h-full max-w-[1620px] px-[20px] mx-auto flex items-center justify-between">
          <span className="text-2xl text-white">Bike Rentals</span>

          <ul className="space-x-5">
            <NavLink to="/">Home</NavLink>
            <NavLink to="about-us">About Us</NavLink>
            <NavLink to="user">Rental Management</NavLink>
            <NavLink to="user">user</NavLink>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
