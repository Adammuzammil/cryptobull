import axios from "axios";

const API_KEY = "a5d16539a4mshb37b38857a8434cp160874jsnabee0f019f9b";
const API_HOST = "coinranking1.p.rapidapi.com";
const BASE_URL = "https://coinranking1.p.rapidapi.com";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST,
  },
});

export const fetchCoinData = async (coinId, params = {}) => {
  try {
    const response = await apiClient.get(`/coin/${coinId}`, { params });
    return response.data.data.coin;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCoins = async (params = {}) => {
  try {
    const response = await apiClient.get("/coins", { params });
    return response.data.data.coins;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
