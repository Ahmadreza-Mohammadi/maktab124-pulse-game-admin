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
import { data } from "react-router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const soldData = [
  {
    label: " هدست",
    data: [0, 10, 20, 15, 30, 25, 40, 35, 50, 45],
    borderColor: "steelblue",
    fill: false,
    tension: 0.1, 
  },
  {
    label: "PS5",
    data: [0, 3, 20, 11, 23, 28, 32, 12, 50, 45],
    borderColor: "green",
    fill: false,
    tension: 0.1, 
  },
  {
    label: "صندلی Razor",
    data: [0, 3, 11, 22, 35, 56, 23, 65, 70, 98],
    borderColor: "blue",
    fill: false,
    tension: 0.1, 
  },
]

function MyChart() {
  // دیتای چارت
  const data = {
    labels: ["روز 1", "روز 2", "روز 3", "روز 4", "روز 5", "روز 6", "روز 7", "روز 8", "روز 9", "روز 10"],
    datasets: soldData,
  };

  // تنظیمات چارت
  const options = {
    responsive: true,
    maintainAspectRatio: false, // برای تنظیم ارتفاع
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "فروش محصولات گیمینگ", },
    },
  };

  return (
    <div className="App" style={{ height: "360px", width: "680px" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default MyChart;
