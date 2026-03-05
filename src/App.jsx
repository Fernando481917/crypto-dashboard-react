import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
Chart as ChartJS,
LineElement,
BarElement,
CategoryScale,
LinearScale,
PointElement,
Tooltip,
Legend
} from "chart.js";

import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
LineElement,
BarElement,
CategoryScale,
LinearScale,
PointElement,
Tooltip,
Legend,
zoomPlugin
);

function App(){

const [coin,setCoin]=useState("bitcoin");
const [days,setDays]=useState("30");
const [priceData,setPriceData]=useState(null);
const [volumeData,setVolumeData]=useState(null);
const [loading,setLoading]=useState(false);
const [error,setError]=useState(null);

async function loadData(){

setLoading(true);
setError(null);

try{

const response = await fetch(
`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`
);

if(!response.ok){
throw new Error("Failed to fetch data");
}

const data = await response.json();

if(!data.prices){
throw new Error("Invalid API response");
}

const labels = data.prices.map(item =>
new Date(item[0]).toLocaleDateString()
);

const prices = data.prices.map(item => item[1]);
const volumes = data.total_volumes.map(item => item[1]);

setPriceData({
labels,
datasets:[
{
label:`${coin} Price (USD)`,
data:prices,
borderColor:"#f97316",
backgroundColor:"rgba(249,115,22,0.25)",
tension:0.4,
fill:true
}
]
});

setVolumeData({
labels,
datasets:[
{
label:"Market Volume",
data:volumes,
backgroundColor:"#4cc9f0"
}
]
});

}catch(err){

console.error(err);
setError("Unable to load data. Please try again.");

}

setLoading(false);

}

useEffect(()=>{
loadData();
},[]);

const chartOptions={
responsive:true,
maintainAspectRatio:false,

plugins:{
legend:{
labels:{color:"#ffffff"}
},
zoom:{
zoom:{
wheel:{enabled:true},
pinch:{enabled:true},
mode:"x"
},
pan:{
enabled:true,
mode:"x"
}
}
},

scales:{
x:{ticks:{color:"#ccc"}},
y:{ticks:{color:"#ccc"}}
}

};

return(

<div className="layout">

<aside className="sidebar">

<h2 className="logo">CryptoDash</h2>

<ul className="menu" role="navigation" aria-label="Main menu">
<li className="active" tabIndex="0">Dashboard</li>
<li tabIndex="0">Markets</li>
<li tabIndex="0">Portfolio</li>
<li tabIndex="0">Analytics</li>
<li tabIndex="0">Reports</li>
<li tabIndex="0">Settings</li>
</ul>

</aside>

<div className="container">

<div className="topbar">

<h1 className="title">Crypto Market Dashboard</h1>

<div className="controls">

<select
value={coin}
onChange={(e)=>setCoin(e.target.value)}
aria-label="Select cryptocurrency"
>

<option value="bitcoin">Bitcoin</option>
<option value="ethereum">Ethereum</option>
<option value="solana">Solana</option>

</select>

<select
value={days}
onChange={(e)=>setDays(e.target.value)}
aria-label="Select time range"
>

<option value="7">7 days</option>
<option value="30">30 days</option>
<option value="90">90 days</option>

</select>

<button
onClick={loadData}
aria-label="Load cryptocurrency data"
>

{loading ? "Loading..." : "Load Data"}

</button>

</div>

</div>

{/* ERROR MESSAGE */}

{error && (
<div className="error">
{error}
</div>
)}

<div className="charts-grid">

{priceData && (
<div className="card">

<h2>Price Chart</h2>

<div className="chart-wrapper">
<Line data={priceData} options={chartOptions}/>
</div>

</div>
)}

{volumeData && (
<div className="card">

<h2>Market Volume</h2>

<div className="chart-wrapper">
<Bar data={volumeData} options={chartOptions}/>
</div>

</div>
)}

</div>

</div>

</div>

);

}

export default App;