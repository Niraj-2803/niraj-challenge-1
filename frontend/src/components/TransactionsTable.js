import React, { useEffect, useState} from 'react';
import { fetchTransactions } from '../services/api';

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        const selectedMonth = month === 'All' ? '' : month;
        const data = await fetchTransactions(selectedMonth, search, page, perPage);
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [month, search, page]);

  useEffect(() => {
    setPage(1);
  }, [month]);


  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-200">
        Transactions for {month === 'All' ? 'All Months' : month}
      </h2>
      <input
        type="text"
        className="p-2 mb-4 border border-black rounded bg-customHover text-gray-900"
        placeholder="Search transactions..."
        value={search}
        onChange={handleSearchChange}
      />
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-customGray border-collapse border-black rounded-lg">
          <thead className="text-left">
            <tr>
              <th className="py-3 px-6 font-medium bg-customBlue text-white border border-black">ID</th>
              <th className="py-3 px-6 font-medium bg-customBlue text-white border border-black">Title</th>
              <th className="py-3 px-6 font-medium bg-customBlue text-white border border-black">Price</th>
              <th className="py-3 px-6 font-medium bg-customBlue text-white border border-black">Description</th>
              <th className="py-3 px-6 font-medium bg-customBlue text-white border border-black">Date of Sale</th>
              <th className="py-3 px-6 font-medium bg-customBlue text-white border border-black">Category</th>
              <th className="py-3 px-6 font-medium bg-customBlue text-white border border-black">Sold</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-black border-collapse hover:bg-customHover">
                <td className="py-3 px-6 text-gray-300 border border-black">{transaction.id}</td>
                <td className="py-3 px-6 text-gray-300 border border-black">{transaction.title}</td>
                <td className="py-3 px-6 text-gray-300 border border-black">{transaction.price}</td>
                <td className="py-3 px-6 text-gray-300 border border-black">{transaction.description}</td>
                <td className="py-3 px-6 text-gray-300 border border-black">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-gray-300 border border-black">{transaction.category}</td>
                <td className="py-3 px-6 text-gray-300 border border-black">{transaction.sold ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-customBlue text-white py-2 px-4 rounded hover:bg-[#83A86A]"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="bg-customBlue text-white py-2 px-4 ml-2 rounded hover:bg-[#83A86A]"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
