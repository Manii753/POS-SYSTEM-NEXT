'use client';
import { useEffect, useState } from 'react';
import { FaBackward } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  
  const router = useRouter();
  const [sales, setSales] = useState([]);
  const [total, setTotal] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [todaySales, setTodaySales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const res = await window.api.getAllSales();
      setSales(res);

      const today = new Date().toISOString().split('T')[0];
      const todayRes = await window.api.getSalesByDay(today);
      setTodaySales(todayRes);

      const totalRes = await window.api.getTotalSalesAmount();
      setTotal(totalRes);
    };
    fetchSales();
  }, []);

  const monthlySales = sales.filter(
    (s) => new Date(s.date).getMonth() + 1 === Number(month)
  );

  const dailyTotals = {};

  monthlySales.forEach((s) => {
    dailyTotals[s.date] = (dailyTotals[s.date] || 0) + s.total_amount;
  });

  const chartData = Object.entries(dailyTotals).map(([date, total]) => ({
    date,
    total,
  }));

  return (
    <div className="p-8 text-white space-y-6">
      
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-600 p-6 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-3xl font-bold mt-2">Rs {total}</p>
        </div>

        <div className="bg-green-600 p-6 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Today's Sales</h2>
          <p className="text-3xl font-bold mt-2">
            Rs {todaySales.reduce((sum, s) => sum + s.total_amount, 0)}
          </p>
        </div>

        <div className="bg-gray-700 p-6 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Select Month</h2>
          <select
            className="mt-2 text-black p-2 rounded"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="bg-white text-black p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-3">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#3182ce" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white text-black p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-3">Today’s Sales Graph</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={todaySales.map((s, i) => ({ id: i + 1, total: s.total_amount }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#2f855a" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
