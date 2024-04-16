import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useTheme } from "./Context/ThemeContext";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import { fetchCoins } from "./lib/coinApi";
import Trending from "./components/Trending";
import CoinPage from "./pages/CoinPage";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

const App = () => {
  const { theme } = useTheme();

  const [coins, setCoins] = useState([]);

  const fetchData = async () => {
    try {
      const coins = await fetchCoins({
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: 10,
        offset: 0,
      });
      console.log(coins);
      setCoins(coins);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`flex flex-col
    h-screen w-full
    bg-${theme === "light" ? "primary" : "primary"}
    text-${theme === "light" ? "primary" : "primary"}`}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home coins={coins} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/coin/:coinId" element={<CoinPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
