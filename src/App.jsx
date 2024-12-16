import { useState, useEffect } from 'react'
import Logo from './assets/logo-unknown.png'
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { data } from 'autoprefixer';
import TransactionsTable from './TransactionsTable';
import FraudOverTime from './FraudOverTime';
import LocationBasedFraud from './LocationBasedFraud';
import AnalyticsDisplay from './AnalyticsData';
import './App.css';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  /*const [lineData, setLineData] = useState(null);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    // Fetch data from API
    fetch('http://127.0.0.1:5000/api/transactions')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Data:', data);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
    fetch('http://127.0.0.1:5000/api/transactions')
      .then((response) => response.json())
      .then((data) => {
        const transactions = data.data;

        // Process Line Chart Data
        const lineChartData = {
          labels: transactions.map((t) => t.transaction_hour),
          datasets: [
            {
              label: "Transaction Amount",
              data: transactions.map((t) => t.amount),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4, // Smooth line
            },
          ],
        };

        // Process Pie Chart Data
        const categoryCounts = transactions.reduce((acc, curr) => {
          acc[curr.merchant_category] = (acc[curr.merchant_category] || 0) + 1;
          return acc;
        }, {});
        /*const pieChartData = {
          labels: Object.keys(categoryCounts),
          datasets: [
            {
              data: Object.values(categoryCounts),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };*//*

        // Update state
        setLineData(lineChartData);
        //setPieData(pieChartData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Turn off labels
      title: { display: true, text: "Transaction Amount by Hour" },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Turn off labels
      title: { display: true, text: "Transactions by Merchant Category" },
    },
  };*/
  return (
    <section id='app'>
      <div className='w-[100vw] h-[100vh] flex'>
        <div className='w-[220px] h-[100%] bg-blue-900 p-[10px] rounded-r-[30px] mr-[10px]'>

          <img className='h-[100px]' src={Logo} alt="" />

          <div className='flex flex-col p-[20px] h-[calc(100%-100px)] justify-between  text-white'>

            <div className='flex flex-col h-[calc(100%-50px)]'>

              <a href="#" className='p-[10px]'>Dashboard</a>
              <a href="#" className='p-[10px]'>Reports</a>
              <a href="#" className='p-[10px]'>Analytics</a>
              <a href="#" className='p-[10px]'>Settings</a>

            </div>

            

            <div className='h-[50px]'>
            <p className='text-center'>Need Help?</p>
            <p className='text-center'>Contact Support</p>
            </div>

          </div>

        </div>

        <div className='w-[calc(100%-230px)] h-[100%] p-[10px]'>

        <h1 className='text-[25px] pt-[20px]'>Welcome Back</h1>

        <AnalyticsDisplay />

        <h1 className='p-[20px] text-[25px] w-[100%] text-center ' >Analytics</h1>
        <TransactionsTable />
        <div className="mb-40px"></div>
        <FraudOverTime />
        <LocationBasedFraud />

        <div className='w-[100%] flex flex-1 justify-between p-[10px]'>

          <div className='w-[65%]'>

          

          </div>

          <div className='w-[25%]'>

          

          </div>

        </div>

        </div>
      </div>
    </section>
  )
}

export default App
