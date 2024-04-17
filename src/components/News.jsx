import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const News = ({ coin }) => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const API_KEY = "a5d16539a4mshb37b38857a8434cp160874jsnabee0f019f9b";
  const API_HOST = "crypto-news34.p.rapidapi.com";
  const BASE_URL = "https://crypto-news34.p.rapidapi.com";

  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/${coin.name}`, {
          params: {
            page: 1,
          },
        });
        setNewsData(response.data.slice(0, 9));
        setPage(2);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setIsLoading(false);
      }
    };

    if (coin.name) {
      fetchData();
    }
  }, [coin.name]);

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/${coin.name}`, {
        params: {
          page: page,
        },
      });
      setNewsData((prevData) => [...prevData, ...response.data]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching more news data:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl ml-16">{coin?.name} News</h2>
      <div className=" mx-auto my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {newsData.map((card, index) => (
            <Card key={index} title={card.title} url={card.url} />
          ))}
        </div>
        {newsData.length < 9 || isLoading ? null : (
          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default News;
