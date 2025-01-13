import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CircularProgress, Typography } from "@mui/material";
import { AnalyticContainerStyled, AnalyticTableWrapper, Headingdiv, TableWrapper3, Top } from "./Analytic.styles";
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
import { FetchAnalyticExpenses } from "../../Service/Analytic.service";
import { ChartData, ExpenseData } from "./Anakytics.types";
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
        <AnalyticTableWrapper>
          <Headingdiv>
            <h1>Analysis</h1>
          </Headingdiv>
          <Top>
            <Typography variant="h6" sx={{ marginLeft: "16px" }}>
              Expenses
            </Typography>
            <div className="header-items">
              <p>Sort By</p>
              <select className="select-any">
                <option value="">Last 12 Months</option>
              </select>
            </div>
          </Top>
          <TableWrapper3>
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
          </TableWrapper3>
        </AnalyticTableWrapper>
      </AnalyticContainerStyled>
    </>
  );
};

export default AnalysisPage;
