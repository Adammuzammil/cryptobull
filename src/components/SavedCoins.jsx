import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { userAuth } from "../Context/AuthContext";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const SavedCoins = () => {
  const [coins, setCoins] = useState([]);
  const { user } = userAuth();
  console.log(coins);

  useEffect(() => {
    if (user && user.uid) {
      const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setCoins(doc.data()?.watchList);
      });
      return unsubscribe;
    }
  }, [user]);

  // const coinPath = doc(db, "users", `${user.uid}`);
  // const deleteCoin = async (coinId) => {
  //   try {
  //     const result = coins.filter((c) => c.id !== coinId.id);
  //     await updateDoc(coinPath, {
  //       watchList: result,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const coinPath = doc(db, "users", `${user.uid}`);

  const deleteCoin = async (coinId) => {
    console.log("coinId parameter:", coinId);
    // Validate coinId parameter
    if (!coinId || !coinId.id) {
      console.error("Invalid coinId parameter provided");
      return;
    }

    try {
      // Ensure coins is defined and filter coins array
      const result = coins ? coins.filter((c) => c.id !== coinId.id) : [];

      // Update the watchList in Firestore
      await updateDoc(coinPath, {
        watchList: result,
      });

      console.log(`Coin with ID ${coinId.id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting coin:", error);
    }
  };

  return (
    <div>
      {coins.length === 0 ? (
        <p>No coins saved as of now..</p>
      ) : (
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <th className="px-4">Rank #</th>
              <th className="text-left">Coin</th>
              <th className="text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.uuid} className="h-[60px] overflow-hidden">
                <td>{coin.rank}</td>
                <td>
                  <Link to={`/coin/${coin.id}`}>
                    <div className="flex items-center">
                      <img
                        className="w-8 mr-4"
                        src={coin.image}
                        alt={coin.name}
                      />
                      <div>
                        <p className="hidden sm:table-cell">{coin?.name}</p>
                        <p className="text-gray-500 text-left text-sm">
                          {coin?.symbol}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="pl-8 cursor-pointer">
                  <AiOutlineClose onClick={() => deleteCoin(coin)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCoins;
