import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import "./App.css";
import Card from "./components/Card";

function App() {

  const [ethLogo, setEthLogo] = useState("");
  const [btcLogo, setBtcLogo] = useState("");

  const [ethPriceTL, setEthPriceTL] = useState("");
  const [btcPriceTL, setBtcPriceTL] = useState("");

  const [chartBtcData, setChartBtcData] = useState([{}]);
  const [chartEthData, setChartEthData] = useState([{}]);

  const getBtcPriceTL = ()  => {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true')
      .then(response => response.json())
      .then((jsonData) => {
        setBtcLogo(jsonData.image.small);
        setBtcPriceTL(jsonData.market_data.current_price.usd);
        setChartBtcData([
          {name: '24 Saat En Düşük', price: jsonData.market_data.low_24h.usd},
          {name: 'Güncel Fiyat', price: jsonData.market_data.current_price.usd},
          {name: '24 Saat En Yüksek', price: jsonData.market_data.high_24h.usd}
        ]);
      })
  }

  const getEthPriceTL = () => {
    fetch('https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true')
      .then(response => response.json())
      .then((jsonData) => {
        setEthLogo(jsonData.image.small);
        setEthPriceTL(jsonData.market_data.current_price.usd);
        setChartEthData([
          {name: '24 Saat En Düşük', price: jsonData.market_data.low_24h.usd},
          {name: 'Güncel Fiyat', price: jsonData.market_data.current_price.usd},
          {name: '24 Saat En Yüksek', price: jsonData.market_data.high_24h.usd}
        ]);
      })
  }

  useEffect(() => {
    getBtcPriceTL();
    getEthPriceTL();
  }, []);

  setInterval(() => {
    getBtcPriceTL();
    getEthPriceTL();
  }, 3000);

  return (
    <div className="flex items-center justify-center w-screen h-screen gap-10 p-8 bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-gray-200 rounded w-80 h-80 gap-y-2">
        <Card 
          img = {btcLogo}
          coin_name = "Bitcoin"
          priceTL = {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'USD' }).format(btcPriceTL)}
        />
        <LineChart width={300} height={150} data={chartBtcData}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-200 rounded w-80 h-80 gap-y-2">
        <Card 
          img = {ethLogo}
          coin_name = "Ethereum"
          priceTL = {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'USD' }).format(ethPriceTL)}
        />
        <LineChart width={300} height={150} data={chartEthData}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}

export default App;