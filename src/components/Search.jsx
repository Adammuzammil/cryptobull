import React, { useState } from "react";

import CoinItem from "./CoinItem";
import { IoIosSearch } from "react-icons/io";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Search = ({ coins, page, selectedPageHandler }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="max-w-[1140px] mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-left my-4 p-2 font-bold text-2xl">MARKET</h1>
        <form className="relative px-4 md:px-0">
          <input
            className=" w-full bg-primary border border-input px-4 py-2  rounded-md shadow-lg outline-none"
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search..."
          />
          <IoIosSearch size={22} className="absolute top-2.5 right-2" />
        </form>
      </div>
      <div className="rounded-div my-4">
        <div className="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right ">
          <h2 className="text-xl font-bold my-2">Search Crypto</h2>
        </div>

        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <th></th>
              <th className="px-4">#</th>
              <th className="text-left">Coin</th>
              <th></th>
              <th>Price</th>
              <th>24h</th>
              <th className="hidden md:table-cell">24h Volume</th>
              <th className="hidden sm:table-cell">Market</th>
              <th>Last 7 days</th>
            </tr>
          </thead>
          <tbody>
            {coins
              .slice(page * 10 - 10, page * 10)
              ?.filter((value) => {
                if (searchText === "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(searchText.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((coin, index) => (
                <CoinItem coin={coin} />
              ))}
          </tbody>
        </table>
      </div>
      {coins.length > 0 && (
        <div className="flex justify-center items-center p-3 my-4 pagination">
          <span>
            <GrFormPrevious
              onClick={() => selectedPageHandler(page - 1)}
              className={page > 1 ? "" : "opacity-10"}
            />
          </span>
          <span>
            {[...Array(coins.length / 10)].map((_, i) => {
              return (
                <span
                  key={i}
                  className={`px-2 ${page === i + 1 ? "text-red-600" : ""}`}
                  onClick={() => selectedPageHandler(i + 1)}
                >
                  {i + 1}
                </span>
              );
            })}
          </span>
          <span>
            <GrFormNext
              onClick={() => selectedPageHandler(page + 1)}
              className={page < coins.length / 10 ? "" : "opacity-10"}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default Search;
