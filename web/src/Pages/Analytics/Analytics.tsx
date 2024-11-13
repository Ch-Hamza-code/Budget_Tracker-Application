import React from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import { Analyticdata } from './Anakytics.Types';
import { AnalyticContainerStyled } from './Analytic.Styles';
import Sidebar from '../../Components/SideBar/SideBar';
import { Chart as ChartJS,  LineElement, CategoryScale,LinearScale,  PointElement, Title, Tooltip, Legend, } from 'chart.js';

  
  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const AnalysisPage: React.FC = () => {

    
    
  return (
    <AnalyticContainerStyled>
    <Sidebar />
    <div className='UserTable'>
    <div className="heading">
      <h1>ANALYSIS</h1>
    </div>
    <div className="Table">
     <Typography variant="h6" sx={{ marginLeft: '16px' }}>Analysis</Typography>
     </div>
     <Line data={Analyticdata} />
      </div>
</AnalyticContainerStyled>
    
  );
};

export default AnalysisPage;





