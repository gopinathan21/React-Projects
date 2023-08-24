import React, { useState } from "react";
import axios from "axios";
import "./Rapid.css"

const Rapid = () => {
  const [market, setMarket] = useState(null);
  const [assets, setAssets] = useState(null);
  const [isMarketLoading, setIsMarketLoading] = useState(false);
  const [isAssetsLoading, setIsAssetsLoading] = useState(false);
  const [assetsID, setAssetsID] = useState(null);
  const [assetUUID, setAssetUUID] = useState(null);
  const [marketID, setMarketID] = useState(null);
  const [marketUUID, setMarketUUID] = useState(null);

  const Loading = () => <div>Loading...Please wait</div>;

  const optionsMarket = {
    method: "GET",
    url: "https://bravenewcoin.p.rapidapi.com/market",
    headers: {
      "X-RapidAPI-Key": "86181d7898msh1b51876816d70fcp15e37cjsn56b758c4d105",
      "X-RapidAPI-Host": "bravenewcoin.p.rapidapi.com",
    },
  };

  const getMarket = async () => {
    if (market) {
      setMarket(null);
      return;
    }
    try {
      setIsMarketLoading(true);
      const response = await axios.request(optionsMarket);
      console.log(response.data.content[0]);
      setMarket(response.data.content.slice(0, 5));
      setIsMarketLoading(false);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  //// ASSETS

  const optionsAssests = {
    method: "GET",
    url: "https://bravenewcoin.p.rapidapi.com/asset",
    params: { status: "ACTIVE" },
    headers: {
      "X-RapidAPI-Key": "86181d7898msh1b51876816d70fcp15e37cjsn56b758c4d105",
      "X-RapidAPI-Host": "bravenewcoin.p.rapidapi.com",
    },
  };

  const getAssets = async () => {
    if (assets) {
      setAssets(null);
      return;
    }
    try {
      setIsAssetsLoading(true);
      const response = await axios.request(optionsAssests);
      console.log(response.data.content.slice(0, 5));
      setAssets(response.data.content.slice(0, 5)); // I have explicitly set 5 as the iimit we can get input form user also
      setIsAssetsLoading(false);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  // get Assets by ID

  const getAssetByID = async () => {
    if (assetsID) {
      setAssetsID(null);
      return;
    }
    const options = {
      method: "GET",
      url: `https://bravenewcoin.p.rapidapi.com/asset/${assetUUID}`,
      headers: {
        "X-RapidAPI-Key": "86181d7898msh1b51876816d70fcp15e37cjsn56b758c4d105",
        "X-RapidAPI-Host": "bravenewcoin.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setAssetsID(response.data);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  //getMarketByUUId

  const getMarketByID = async () => {
    if (marketID) {
      setMarketID(null);
      return;
    }

    const options = {
      method: "GET",
      url: `https://bravenewcoin.p.rapidapi.com/market/${marketUUID}`,
      headers: {
        "X-RapidAPI-Key": "86181d7898msh1b51876816d70fcp15e37cjsn56b758c4d105",
        "X-RapidAPI-Host": "bravenewcoin.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setMarketID(response.data);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div>
      <h1>I have not added any styles for now</h1>
      <button onClick={getMarket}>{market ? "Toggle" : "Get Market"}</button>
      {isMarketLoading ? (
        <Loading />
      ) : (
        market && (
          <div>
            <h2>Market Data</h2>
            <ul>
              {market.map((mark, index) => (
                <li key={index}>
                  <strong>Market {index + 1}</strong>
                  <ul>
                    {Object.entries(mark).map(([key, value]) => (
                      <li key={key}>
                        {key}:{value}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
      <hr />
      <button onClick={getAssets}>{assets ? "Toggle" : "Get Assets"}</button>
      {isAssetsLoading ? (
        <Loading />
      ) : (
        assets && (
          <div>
            <h2>Assets Data</h2>
            <ul>
              {assets.map((asset, index) => (
                <li key={index}>
                  <strong>Asset {index + 1}</strong>
                  <ul>
                    {Object.entries(asset).map(([key, value]) => (
                      <li key={key}>
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )
      )}

      <hr />
      <input
        placeholder="Give Assets UUID"
        onChange={(e) => setAssetUUID(e.target.value)}
      ></input>
      <button onClick={getAssetByID}>{assetsID ? "Toggle" : "Load"}</button>
      {assetsID && (
        <div>
          <h1>Asset ID</h1>
          {JSON.stringify(assetsID)}
        </div>
      )}
      <hr />

      <input
        placeholder="Give Market UUID"
        onChange={(e) => setMarketUUID(e.target.value)}
      ></input>
      <button onClick={getMarketByID}>{marketID ? "Toggle" : "Load"}</button>
      {marketID && (
        <div>
          <h1>Asset ID</h1>
          {JSON.stringify(marketID)}
        </div>
      )}
    </div>
  );
};

export default Rapid;
