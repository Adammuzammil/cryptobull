import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="rounded-div mt-8 pt-8 text-primary">
      <div className="grid md:grid-cols-2">
        <div className="flex justify-evenly w-full md:max-w-[300px]">
          <div className="flex items-center">
            <h2>
              <Link to="/" className="font-bold">
                Cryptobull
              </Link>
            </h2>
          </div>

          <div>
            <h2 className="font-bold">Info</h2>
            <ul>
              <li>About Us</li>
              <li>About Us</li>
              <li>About Us</li>
              <li>About Us</li>
            </ul>
          </div>
        </div>

        <div className="text-right">
          <div className="w-full flex justify-end">
            <div className="w-full md:w-[300px] py-4 relative">
              <p className="text-center md:text-right">
                Sign up for crypto news
              </p>
              <div className="py-4">
                <form>
                  <input
                    className="bg-primary border border-input p-2 mr-2 w-full shadow-xl rounded-2xl md:w-auto"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                  <button className="bg-button text-button px-4 p-2 w-full rounded-2xl shadow-xl hover:shadow-2xl md:w-auto my-2">
                    Sign up
                  </button>
                </form>
              </div>

              <div className="flex py-4 justify-between text-accent">
                <FaTwitter />
                <FaFacebook />
                <FaGithub />
                <FaLinkedin />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center py-4">Powered by Coin ranking</p>
    </div>
  );
};

export default Footer;
