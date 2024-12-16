import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const FraudOverTime = () => {
  const [fraudData, setFraudData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/transactions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Aggregate data for fraud cases across all months
        const monthlyFraudCounts = data.data.reduce((acc, transaction) => {
          if (transaction.is_fraudulent) {
            const month = new Date(transaction.timestamp).getMonth(); // 0 = January, 11 = December
            acc[month] = (acc[month] || 0) + 1;
          }
          return acc;
        }, {});

        // Ensure all months (0-11) are included, even if fraud counts are zero
        const fullMonthlyFraudCounts = Array.from({ length: 12 }, (_, i) => ({
          month: i,
          count: monthlyFraudCounts[i] || 0
        }));

        setFraudData(fullMonthlyFraudCounts);

      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Unable to fetch fraud data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Prepare data for Chart.js
  const chartData = {
    labels: fraudData.map(({ month }) => `Month ${month + 1}`), // Display month as "Month X"
    datasets: [
      {
        label: 'Fraud Cases',
        data: fraudData.map(({ count }) => count),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      }
    ]
  };

  return (
    <div>
      <h2>Fraud Cases Over Time</h2>
      <Line data={chartData} />
    </div>
  );
};

export default FraudOverTime;
