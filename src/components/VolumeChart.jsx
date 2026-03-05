import { Bar } from "react-chartjs-2"
import {
Chart as ChartJS,
BarElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
} from "chart.js"

ChartJS.register(
BarElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
)

function VolumeChart(){

const data = {
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[
{
label:"Volume",
data:[120,190,300,250,220,310,400],
backgroundColor:"#fb923c"
}
]
}

return <Bar data={data} />
}

export default VolumeChart