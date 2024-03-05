import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const { setToken } = useAuthStore();

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Home", to: "/" },
    { id: 2, text: "Categories", to: "/my-categories" },
  ];

  return (
    <div className="bg-[#00246B] flex justify-between items-center h-24 mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-[#8AB6F9]">EXPENSER</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li className="p-4 hover:bg-[#8AB6F9] rounded-xl m-2 cursor-pointer duration-300 hover:text-[#00246B]">
            <Link key={item.id} to={item.to}>
              {item.text}
            </Link>
          </li>
        ))}
        <li className="p-4 hover:bg-[#8AB6F9] rounded-xl m-2 cursor-pointer duration-300 hover:text-[#00246B]">
          <button
            onClick={() => {
              setToken("");
            }}
          >
            Logout
          </button>
        </li>
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden text-[#8AB6F9]">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-[#CADCFC] bg-[#00246B] ease-in-out duration-500 z-40"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] z-40"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-[#8AB6F9] m-4">
          EXPENSER
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li className="p-4 border-b rounded-xl hover:bg-[#8AB6F9] duration-300 hover:text-[#00246B] cursor-pointer border-[#CADCFC]">
            <Link key={item.id} to={item.to}>
              {item.text}
            </Link>
          </li>
        ))}
        <li className="p-4 border-b rounded-xl hover:bg-[#8AB6F9] duration-300 hover:text-[#00246B] cursor-pointer border-[#CADCFC]">
          <button
            onClick={() => {
              setToken("");
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
