import { Line } from "react-chartjs-2"
import zoomPlugin from "chartjs-plugin-zoom"

import {
Chart as ChartJS,
LineElement,
CategoryScale,
LinearScale,
PointElement,
Tooltip,
Legend
} from "chart.js"

ChartJS.register(
LineElement,
CategoryScale,
LinearScale,
PointElement,
Tooltip,
Legend,
zoomPlugin
)

function PriceChart(){

const data = {
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[
{
label:"Price",
data:[42000,43000,41000,45000,47000,46000,48000],
borderColor:"#f97316",
backgroundColor:"rgba(249,115,22,0.3)",
tension:0.4
}
]
}

const options={
responsive:true,
plugins:{
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
}
}

return <Line data={data} options={options}/>
}

export default PriceChart