import axios from "axios";

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

export const fetchNewsData = async (coin) => {
  try {
    const response = await apiClient.get(`/${coin.name}`);
    return response.data.items;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// const options = {
//   method: "GET",
//   url: "/search",
//   params: {
//     keyword: "facebook",
//     lr: "en-US",
//   },
//   headers: {
//     "X-RapidAPI-Key": API_KEY,
//     "X-RapidAPI-Host": API_HOST,
//   },
// };
