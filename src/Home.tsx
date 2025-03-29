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

function Home() {
  // دیتای چارت
  const data = {
    labels: ["روز 1", "روز 2", "روز 3", "روز 4", "روز 5", "روز 6", "روز 7", "روز 8", "روز 9", "روز 10"],
    datasets: [
      {
        label: "فروش هدست",
        data: [0, 10, 20, 15, 30, 25, 40, 35, 50, 45],
        borderColor: "steelblue",
        fill: false,
        tension: 0.1, // برای خط صاف‌تر
      },
    ],
  };

  // تنظیمات چارت
  const options = {
    responsive: true,
    maintainAspectRatio: false, // برای تنظیم ارتفاع
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "فروش هدست‌های گیمینگ" },
    },
  };

  return (
    <div className="App" style={{ height: "500px", width: "900px" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default Home;
