import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import { AnalyticContainerStyled } from './Analytic.Styles';
import Sidebar from '../../Components/SideBar/SideBar';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const AnalysisPage: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const fetchExpensesData = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const expenses = response.data; 
      const monthlyData = Array(12).fill(0); 
      expenses.forEach((expense: any) => {
        const date = new Date(expense.date);
        const month = date.getMonth(); 
        monthlyData[month] += expense.price; 
      });

      setChartData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Expenses (PKR)',
            data: monthlyData,
            borderColor: 'purple',
            backgroundColor: 'rgba(128, 0, 128, 0.2)',
            pointBackgroundColor: 'purple',
            tension: 0.5,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpensesData();
  }, []);

  return (
    <AnalyticContainerStyled>
      <Sidebar />
      <div className="UserTable">
        <div className="heading">
          <h1>ANALYSIS</h1>
        </div>
        <div className="Table">
          <Typography variant="h6" sx={{ marginLeft: '16px' }}>
            Monthly Expense Analysis
          </Typography>
        </div>
        {chartData.labels.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>
            No data available to display.
          </Typography>
        )}
      </div>
    </AnalyticContainerStyled>
  );
};

export default AnalysisPage;
