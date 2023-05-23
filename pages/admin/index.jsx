import Link from "next/link";
import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";
import AdminSidebar from "@/components/AdminSidebar";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement
);

const Index = () => {
  // Line chart data
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [120, 150, 200, 180, 220, 250],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Revenue",
        data: [2500, 3000, 2800, 3500, 3200, 4000],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Line chart options
  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Pie chart data
  const pieChartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 205, 86, 1)",
        ],
      },
    ],
  };

  // Pie chart options
  const pieChartOptions = {
    responsive: true,
  };

  return (
    <div className="flex justify-end bg-slate-100">
      <AdminSidebar />
      <main className="p-8 w-4/5 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="chsrts flex">
          <div className="w-3/5">
            <h2 className="text-lg font-semibold mb-2">Line Charts</h2>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
          <div className="w-2/5">
            <h2 className="text-lg font-semibold mb-2">Pie Charts</h2>
            <div className="h-60">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
            <div className="h-60">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
