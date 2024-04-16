import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { userAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logOut, user } = userAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    setError("");
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const handleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <nav className="rounded-div flex items-center justify-between space-x-4 p-5 font-semibold">
      <Link to="/">
        <h1 className="text-xl font-bold">Cryptobull</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/">Home</Link>
        <Link to="/trending">Trending</Link>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <div>
          <ThemeToggle />
        </div>

        {user?.email ? (
          <div>
            <Link to="/account" className="p-4">
              Account
            </Link>
            <button className="" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="">
            <Link to="/signin" className="mr-4 hover:text-accent">
              Sign in
            </Link>
            <Link
              to="/signup"
              className="bg-button text-button px-5 py-2 rounded-lg shadow-lg hover:shadow-2xl"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>

      {/* Menu Icon */}
      <div className="flex md:hidden cursor-pointer z-10" onClick={handleOpen}>
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10"
            : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-center ease-in duration-300"
        }`}
      >
        <ul className="w-full p-4">
          <li className="border-b py-6">
            <Link to="/">Home</Link>
          </li>
          <li className="border-b py-6">
            <Link to="/">Account</Link>
          </li>
          <li className="border-b py-6">
            <ThemeToggle />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4">
          <Link to="/signin" className="mr-4">
            <button className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-xl shadow-xl">
              Sign in
            </button>
          </Link>
          <Link to="/signup" className="mr-4">
            <button className="w-full my-2 p-3 bg-button text-button rounded-xl">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
