"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ResultsChart({ data }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = ref.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data?.x || [],
        datasets: [{ label: data?.label || "Simulation", data: data?.y || [] }]
      },
      options: { responsive: true, animation: false, plugins: { legend: { display: true } } }
    });
    return () => chart.destroy();
  }, [data]);
  return <canvas aria-label="Simulation chart" role="img" tabIndex={0} />;
}
