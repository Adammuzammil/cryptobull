import React, { useEffect, useState } from "react";
import { fetchCoinData } from "../lib/coinApi";
import { useParams } from "react-router-dom";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { FaFacebook, FaGithub, FaReddit, FaTwitter } from "react-icons/fa";
import News from "../components/News";

const CoinPage = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinData = await fetchCoinData(coinId);
        setCoin(coinData);
        console.log(coinData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [coinId]);
  return (
    <>
      <div className="rounded-div my-12 py-8">
        <div className="flex py-8">
          <img className="w-20 mr-8" src={coin?.iconUrl} alt="" />
          <div>
            <p className="text-3xl font-semibold">{coin?.name}</p>
            <p>({coin?.symbol} / USD)</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div>
              {coin?.price ? (
                <p className="text-3xl font-bold">
                  ${parseFloat(coin.price).toLocaleString()}
                </p>
              ) : null}
            </div>
            <div>
              <Sparklines data={coin?.sparkline}>
                <SparklinesLine color="teal" />
                <SparklinesSpots />
              </Sparklines>
            </div>

            <div className="flex justify-between py-4">
              <div>
                <p className="text-gray-500 text-sm">Market Cap</p>
                {coin?.marketCap ? (
                  <p>${parseFloat(coin.marketCap).toLocaleString()}</p>
                ) : null}
              </div>
              <div>
                <p>Volume (24h)</p>
                {coin?.["24hVolume"] ? (
                  <p>${parseFloat(coin?.["24hVolume"]).toLocaleString()}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Market Stats</h2>
            <div className="flex">
              <div>
                <h3 className="text-sm text-gray-500">Market Rank</h3>
                <p>{coin?.rank}</p>
              </div>
            </div>

            <div className="flex justify-between py-4">
              <div>
                <p className="text-sm text-gray-500">Circulating Supply</p>
                {coin?.supply?.circulating ? (
                  <p>
                    {Number(coin?.supply?.circulating).toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 8,
                    })}{" "}
                    BTC
                  </p>
                ) : null}{" "}
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Supply</p>
                {coin?.supply?.total ? (
                  <p>
                    {Number(coin?.supply?.total).toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 8,
                    })}{" "}
                    BTC
                  </p>
                ) : null}{" "}
              </div>
            </div>
            <div className="flex justify-between py-4">
              <div>
                <p className="text-sm text-gray-500">Max. Supply</p>
                {coin?.supply?.max ? (
                  <p>
                    {Number(coin?.supply?.max).toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 8,
                    })}{" "}
                    BTC
                  </p>
                ) : (
                  "N/A"
                )}{" "}
              </div>

              <div className="">
                <p className="text-sm text-gray-500">
                  Fully diluted market cap
                </p>
                {coin?.fullyDilutedMarketCap ? (
                  <p>
                    ${parseFloat(coin.fullyDilutedMarketCap).toLocaleString()}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex justify-around p-4 pl-0 text-accent">
              <FaTwitter />
              <FaFacebook />
              <FaReddit />
              <FaGithub />
            </div>
          </div>
        </div>

        <div className="py-4">
          <p className="text-xl font-bold">About {coin?.name}</p>
          <p>{coin?.description}</p>
        </div>
      </div>
      <News coin={coin} />
    </>
  );
};

export default CoinPage;
