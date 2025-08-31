import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import Loading from "../../../../Layout/Shared/Loading/Loading";

const AdminDashboardHome = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin-dashboard-stats`)
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return Loading;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

  return (
    <div className="p-6">
      {/* Top Stats */}
      <div className="grid md:grid-cols-5 gap-6 mb-10">
        <div className="bg-blue-100 p-6 rounded-xl text-center shadow">
          <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
          <p>Users</p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl text-center shadow">
          <h2 className="text-2xl font-bold">{stats.totalProducts}</h2>
          <p>Products</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-xl text-center shadow">
          <h2 className="text-2xl font-bold">{stats.totalCategories}</h2>
          <p>Categories</p>
        </div>
        <div className="bg-red-100 p-6 rounded-xl text-center shadow">
          <h2 className="text-2xl font-bold">{stats.totalOrders}</h2>
          <p>Orders</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-xl text-center shadow">
          <h2 className="text-2xl font-bold">{stats.totalReviews}</h2>
          <p>Reviews</p>
        </div>
      </div>

      {/* Category Pie Chart */}
      <div className="bg-white shadow p-6 rounded-xl mb-10">
        <h2 className="text-xl font-bold mb-4">Products by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stats.categoryStats}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {stats.categoryStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Example Sales Trend (fake now, later use createdAt) */}
      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Monthly Products Added</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[{ month: "Jan", count: 5 }, { month: "Feb", count: 8 }, { month: "Mar", count: 12 }]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
