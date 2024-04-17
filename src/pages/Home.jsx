import React from "react";
import Search from "../components/Search";

const Home = ({ coins, page, selectedPageHandler }) => {
  return (
    <div>
      <Search
        coins={coins}
        page={page}
        selectedPageHandler={selectedPageHandler}
      />
    </div>
  );
};

export default Home;
