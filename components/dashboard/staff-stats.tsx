"use client"

import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface StaffStatsProps {
  data: {
    name: string
    shifts: number
  }[]
}

export function StaffStats({ data }: StaffStatsProps) {
  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Shifts",
        },
      },
    },
  }

  const chartData = {
    labels: data?.map((item) => item.name),
    datasets: [
      {
        data: data?.map((item) => item.shifts),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="h-[300px] w-full">
      <Bar options={options} data={chartData} />
    </div>
  )
}
