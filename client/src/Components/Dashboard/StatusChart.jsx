import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 170,
  hideLegend: true,
};

const StatusChart = ({ dashboardData }) => {
  const [data, setData] = React.useState([
    { label: "Active", value: 0, color: "#4CAF50" },
    { label: "Inactive", value: 0, color: "#F44336" },
  ]);

  React.useEffect(() => {
    const properties = dashboardData[0]?.properties || [];
    const activeCount = properties.filter(
      (prop) => prop.status.toLowerCase() === "active"
    ).length;
    const total = properties.length;

    const targetData = [
      { label: "Active", value: activeCount, color: "#4CAF50" },
      { label: "Inactive", value: total - activeCount, color: "#F44336" },
    ];

    let start = null;
    const duration = 1000; // 1 second animation

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      // Update values proportionally
      setData(
        targetData.map((item, idx) => ({
          ...item,
          value: Math.round(item.value * progress),
        }))
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [dashboardData]);

  return (
    <PieChart
      series={[
        {
          innerRadius: 30,
          outerRadius: 60,
          data,
          arcLabel: "value",
          labelStyle: { fill: "#E0E1DD", fontWeight: 600 },
        },
      ]}
      {...settings}
    />
  );
};

export default StatusChart;
