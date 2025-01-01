import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CircularProgress, Typography } from "@mui/material";
import { AnalyticContainerStyled, Headingdiv } from "./Analytic.Styles";
import Sidebar from "../../Components/SideBar/SideBar";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FetchAnalyticExpenses } from "./Analytic.service";
import { ChartData, ExpenseData } from "./Anakytics.Types";
import MenuAppBar from "../../Components/AppBar/Appbar";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const AnalysisPage: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpensesData = async () => {
    try {
      const expenses: ExpenseData[] = await FetchAnalyticExpenses();
      const monthlyData = Array(12).fill(0);

      expenses.forEach(({ date, price }) => {
        const month = new Date(date).getMonth();
        monthlyData[month] += price;
      });

      setChartData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Expenses (PKR)",
            data: monthlyData,
            borderColor: "purple",
            backgroundColor: "rgba(128, 0, 128, 0.2)",
            pointBackgroundColor: "purple",
            tension: 0.5,
          },
        ],
      });
    } catch (error: any) {
      setError(error.message || "Error fetching expenses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpensesData();
  }, []);

  return (
    <>
      <MenuAppBar />
      <AnalyticContainerStyled>
        <Sidebar />
        <div className="UserTable">
          <Headingdiv>
            <h1>Analysis</h1>
          </Headingdiv>
          <div className="Table">
            <Typography variant="h6" sx={{ marginLeft: "16px" }}>
              Monthly Expense Analysis
            </Typography>
          </div>
          {loading ? (
            <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
          ) : error ? (
            <Typography variant="body1" sx={{ textAlign: "center", color: "red", marginTop: "20px" }}>
              {error}
            </Typography>
          ) : chartData ? (
            <Line data={chartData} />
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center", marginTop: "20px" }}>
              No data available to display.
            </Typography>
          )}
        </div>
      </AnalyticContainerStyled>
    </>
  );
};

export default AnalysisPage;
