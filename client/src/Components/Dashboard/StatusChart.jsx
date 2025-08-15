
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';



const settings = {
  margin: { right: 5 },
  width: 200,
  height: 170,
  hideLegend: true,
};


const StatusChart=({dashboardData})=>{

    const [data, setData] = React.useState([
    { label: 'Active', value: 0, color: '#2ff3e0' },
    { label: 'Inactive', value: 0, color: '#f8d210' },
  ]);


      React.useEffect(() => {
    const properties = dashboardData[0]?.properties || [];

    const activeCount = properties.filter(
      (prop) => prop.status.toLowerCase() === 'active'
    ).length;

    const total = properties.length;

    setData([
      { label: 'Active', value: activeCount, color: 'red' },
      { label: 'Inactive', value: total - activeCount, color: '#f8d210' },
    ]);
  }, [dashboardData]);

  

  

return<>

<PieChart
      series={[{ innerRadius: 30, outerRadius: 80, data, arcLabel: 'value' }]}
      {...settings}
    />
</>
}

export default StatusChart