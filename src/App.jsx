import { useState, useEffect } from 'react';
import { fetchStock } from './api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// Stocks to fetch
const stocksToFetch = ['AAPL', 'MSFT', 'GOOGL', 'AMZN'];

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none'); // 'asc' | 'desc' | 'none'

  useEffect(() => {
    async function loadStocks() {
      try {
        console.log('Fetching stocks...');
        const promises = stocksToFetch.map(symbol => fetchStock(symbol));
        const results = await Promise.all(promises);
        console.log('Fetched results:', results);
        setStocks(results);
      } catch (err) {
        console.error('Error fetching stocks:', err);
        setError('Failed to fetch stock data.');
      } finally {
        setLoading(false);
      }
    }
    loadStocks();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: stocks.map(stock => stock.symbol),
    datasets: [
      {
        label: 'Stock Prices ($)',
        data: stocks.map(stock => stock.price),
        fill: false,
        borderColor: '#3b82f6',
        backgroundColor: '#93c5fd',
        tension: 0.2,
      },
    ],
  };

  // Filter and sort stocks
  const displayedStocks = stocks
    .filter(stock => stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Stock Price Dashboard</h1>

      {/* Search Bar */}
      <div className="mb-4 w-full max-w-4xl">
        <input
          type="text"
          placeholder="Search by Symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Sort Buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setSortOrder('asc')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sort Price ↑
        </button>
        <button
          onClick={() => setSortOrder('desc')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sort Price ↓
        </button>
        <button
          onClick={() => setSortOrder('none')}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Clear Sort
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-xl">{error}</div>
      ) : (
        <>
          {/* Stock Table */}
          <div className="overflow-x-auto w-full max-w-4xl mb-8">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Symbol</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Change %</th>
                </tr>
              </thead>
              <tbody>
                {displayedStocks.map(stock => (
                  <tr key={stock.symbol} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-6">{stock.symbol}</td>
                    <td className="py-3 px-6">${stock.price.toFixed(2)}</td>
                    <td className={`py-3 px-6 ${stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.changePercent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stock Price Chart */}
          <div className="w-full max-w-4xl bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Stock Prices Chart</h2>
            <Line data={chartData} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
