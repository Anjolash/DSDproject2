import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import './TransationsTable.css';  // Importing the CSS file

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10); // Number of rows per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/transactions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();  // Parse JSON data
        if (result && result.data && Array.isArray(result.data)) {
          setTransactions(result.data);  // Set transactions if valid
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Unable to fetch transactions. Please try again.');
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

  // Pagination logic
  const offset = currentPage * itemsPerPage;
  const currentTransactions = transactions.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <h1>Transactions</h1>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Card Number</th>
            <th>Card Type</th>
            <th>Merchant</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map(transaction => (
            <tr key={transaction.transaction_id}>
              <td>{transaction.amount}</td>
              <td>{transaction.card_number}</td>
              <td>{transaction.card_type}</td>
              <td>{transaction.merchant}</td>
              <td>{new Date(transaction.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={Math.ceil(transactions.length / itemsPerPage)}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default TransactionsTable;
