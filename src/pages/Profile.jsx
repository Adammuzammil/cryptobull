import React, { useState } from "react";
import SavedCoins from "../components/SavedCoins";
import { userAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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

  return (
    <div className="">
      <div className="flex justify-between items-center my-12 py-8 rounded-div">
        <div>
          <h1 className="text-2xl font-bold">Account</h1>
          <div>
            <p>Welcome, {user?.email}</p>
          </div>
        </div>
        <div>
          <button
            className="border px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center my-12 py-8 rounded-div">
        <div className="w-full min-h-[300px]">
          <h1 className="text-2xl font-bold py-4">Saved Coins</h1>
          <SavedCoins />
        </div>
      </div>
    </div>
  );
};

export default Profile;
