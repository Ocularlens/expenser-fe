import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { TbMoneybag } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ROUTES = [
  { to: "/", text: "Dashboard" },
  { to: "/transactions", text: "Transactions" },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(true);
  const { setIsLoggedIn, setToken } = useAuthStore();

  return (
    <nav className="bg-[#00246B] w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <TbMoneybag className="h-8 text-[#FFF]" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#FFF]">
            Expenser
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center text-[#FFF] p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden"
            onClick={() => {
              setShowMenu((prev) => !prev);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <HiMenu className="h-5 w-5" />
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            showMenu && "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 bg-[#00246B] md:space-x-8">
            <li>
              {ROUTES.map((route) => (
                <Link
                  className="block py-2 px-3 text-white"
                  key={route.text}
                  to={route.to}
                >
                  {route.text}
                </Link>
              ))}
              <button
                className="block py-2 px-3 text-white"
                onClick={() => {
                  setIsLoggedIn(false);
                  setToken("");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
