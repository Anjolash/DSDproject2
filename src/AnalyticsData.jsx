import React, { useState, useEffect } from 'react';

const AnalyticsDisplay = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
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
  
        // Ensure the response contains a data key and is an array
        const transactions = data.data;
        if (!Array.isArray(transactions)) {
          throw new Error('Invalid data format: expected an array');
        }
  
        // Correct calculations
        const totalTransactions = transactions.length;
        const totalFrauds = transactions.filter(transaction => transaction.is_fraudulent).length;
        const uniqueCountries = new Set(transactions.map(transaction => transaction.country)).size;
        const uniqueCustomers = new Set(transactions.map(transaction => transaction.customer_id)).size;
  
        setAnalyticsData({
          totalTransactions,
          totalFrauds,
          uniqueCountries,
          uniqueCustomers
        });
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Unable to fetch analytics data. Please try again.');
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

  if (!analyticsData) {
    return <p>No data available</p>;
  }

  return (
    <div className="flex justify-between w-[80%] m-[auto] mt-[30px]">
      <div className="p-[40px] pt-[30px] pb-[30px] text-center border-[1px] rounded-[20px]">
        <p className="p-[10px] pb-[5px] text-[20px] pt-[5px] font-semibold">{analyticsData.totalTransactions}</p>
        <p className="p-[10px] text-[17px] pb-[0px]">Total Transactions</p>
      </div>

      <div className="p-[40px] pt-[30px] pb-[30px] text-center border-[1px] rounded-[20px]">
        <p className="p-[10px] pb-[5px] text-[20px] pt-[5px] font-semibold">{analyticsData.totalFrauds}</p>
        <p className="p-[10px] text-[17px] pb-[0px]">Total Frauds</p>
      </div>

      <div className="p-[40px] pt-[30px] pb-[30px] text-center border-[1px] rounded-[20px]">
        <p className="p-[10px] pb-[5px] text-[20px] pt-[5px] font-semibold">{analyticsData.uniqueCountries}</p>
        <p className="p-[10px] text-[17px] pb-[0px]">Unique Countries</p>
      </div>

      <div className="p-[40px] pt-[30px] pb-[30px] text-center border-[1px] rounded-[20px]">
        <p className="p-[10px] pb-[5px] text-[20px] pt-[5px] font-semibold">{analyticsData.uniqueCustomers}</p>
        <p className="p-[10px] text-[17px] pb-[0px]">Unique Customers</p>
      </div>
    </div>
  );
};

export default AnalyticsDisplay;
