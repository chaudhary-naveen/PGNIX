import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 170,
  hideLegend: true,
};

const StatusChart = ({ dashboardData }) => {
  console.log(dashboardData);
 
  const [data, setData] = React.useState([
    { label: "Vacant Rooms", value: 0, color: "#4CAF50" },
    { label: "Occupied Rooms", value: 0, color: "#f56721ff" },
  ]);

  React.useEffect(() => {
    const properties = dashboardData?.properties || [];
    const vacant = properties.reduce((acc, property) => { acc += property.single_vacant_rooms + property.double_vacant_rooms + property.triple_vacant_rooms; return acc; }, 0);
    const total = properties.reduce((acc,property)=>{acc += property.single_total_rooms + property.double_total_rooms + property.triple_total_rooms; return acc;}, 0);

    const targetData = [
      { label: "Vacant Rooms", value: vacant, color: "#4CAF50" },
      { label: "Occupied Rooms", value: total - vacant, color: "#f56721ff" },
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
