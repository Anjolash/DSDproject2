import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LocationBasedFraud = () => {
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

        // Aggregate data by location for fraud counts
        const locationFraudCounts = data.data.reduce((acc, transaction) => {
          if (transaction.is_fraudulent) { // Filter for fraudulent transactions
            const location = transaction.country || transaction.city || transaction.city_size; // Choose a location field
            acc[location] = (acc[location] || 0) + 1;
          }
          return acc;
        }, {});

        // Transform aggregated data into chart-ready format
        const labels = Object.keys(locationFraudCounts);
        const values = Object.values(locationFraudCounts);

        setFraudData({ labels, values });

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
    labels: fraudData.labels,
    datasets: [
      {
        label: 'Fraud Cases',
        data: fraudData.values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div>
      <h2>Fraud Cases by Location</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default LocationBasedFraud;
