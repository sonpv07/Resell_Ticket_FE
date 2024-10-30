import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import Typography from "@mui/material/Typography";

// Import DashboardService
import DashboardService from '../../../services/dashboard.service';

const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: { show: false }
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  grid: { strokeDashArray: 0 }
};

export default function IncomeAreaChart() {
  const theme = useTheme();
  const { secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);
  const [currentYear] = useState(new Date().getFullYear()); // Set current year

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
        labels: {
          style: { colors: Array(12).fill(secondary) }
        },
        axisBorder: { show: true, color: line }
      },
      yaxis: {
        labels: { 
          style: { colors: [secondary] },
          formatter: (value) => `${value} VND` // Show VND units
        }
      },
      grid: { borderColor: line }
    }));
  }, [secondary, line, theme]);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      const monthlyProfits = [];

      for (let month = 1; month <= 12; month++) {
        const response = await DashboardService.getMonthlyPackageProfit(month, currentYear);
        if (response.success) {
          monthlyProfits.push(response.data);
        } else {
          console.error(`Failed to fetch data for month ${month}:`, response.message);
          monthlyProfits.push(0);
        }
      }

      setSeries([
        {
          name: 'Revenue',
          data: monthlyProfits
        }
      ]);
    };

    fetchMonthlyRevenue();
  }, [currentYear]);

  return (
    <div>
      {/* Add the title with the year */}
      <Typography variant="h6" gutterBottom>
        Monthly Revenue for {currentYear}
      </Typography>
      <ReactApexChart options={options} series={series} type="area" height={450} />
    </div>
  );
}

IncomeAreaChart.propTypes = { slot: PropTypes.string };
