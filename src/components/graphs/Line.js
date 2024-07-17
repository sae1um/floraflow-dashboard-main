import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineGraph = ({ data }) => {
  const options = {};

  const chartData = {
    labels: data.map(item => item.formatted_time),
    datasets: [
      {
        label: "Temperature",
        data: data.map(item => item.temperature),
        borderColor: "#e63762",
      },
      {
        label: "Humidity",
        data: data.map(item => item.humidity),
        borderColor: "#f2a734"
      }
    ],
  };

  return (
    <div>
      <Line options={options} data={chartData} />
    </div>
  );
};
