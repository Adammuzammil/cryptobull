import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { userAuth } from "../Context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinItem = ({ coin }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = userAuth();

  const saveCoin = async () => {
    // Early return if user is not logged in or coin data is missing
    if (!user || !user.uid || !coin || !coin.uuid) {
      alert("Please sign in to save the coin");
      return;
    }

    const coinRef = doc(db, "users", `${user.uid}`);

    const coinData = {
      id: coin?.uuid,
      name: coin?.name,
      symbol: coin?.symbol,
      image: coin?.iconUrl,
      price: coin?.price,
    };

    const filteredCoinData = Object.fromEntries(
      Object.entries(coinData).filter(([key, value]) => value !== undefined)
    );

    try {
      // Set `isSaved` to true only if saving is successful
      await updateDoc(coinRef, {
        watchList: arrayUnion(filteredCoinData),
      });
      setIsSaved(true);
    } catch (error) {
      // Set `isSaved` to false if an error occurs
      setIsSaved(false);
      console.error("Error saving coin:", error);
      alert("Failed to save coin. Please try again.");
    }
  };

  return (
    <tr className="h-[80px] border-b overflow-hidden">
      <td onClick={saveCoin}>
        {isSaved ? <AiFillStar color="orange" /> : <AiOutlineStar />}
      </td>
      <td>{coin?.rank}</td>
      <td>
        <Link to={`/coin/${coin?.uuid}`}>
          <div className="flex items-center justify-start">
            <img
              src={coin?.iconUrl}
              alt={coin?.name}
              className="w-8 mr-2 rounded-full"
            />
            <p className="hidden sm:table-cell">{coin?.name}</p>
          </div>
        </Link>
      </td>
      <td>{coin?.symbol}</td>
      <td>{coin?.price ? parseFloat(coin.price).toLocaleString() : "N/A"}</td>

      <td>
        {coin?.change > 0 ? (
          <p className="text-green-600">{coin?.change}</p>
        ) : (
          <p className="text-red-600">{coin?.change}</p>
        )}
      </td>
      <td className="w-[180px] hidden md:table-cell">{coin?.["24hVolume"]}</td>
      <td className="w-[180px] hidden sm:table-cell">{coin?.marketCap}</td>
      <td>
        <Sparklines data={coin?.sparkline}>
          <SparklinesLine color={coin?.color} />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
