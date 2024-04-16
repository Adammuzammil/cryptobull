import React from "react";
import Search from "../components/Search";

const Home = ({ coins }) => {
  return (
    <div>
      <Search coins={coins} />
    </div>
  );
};

export default Home;
