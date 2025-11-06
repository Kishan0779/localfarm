import React, { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, ShoppingBasket, DollarSign, Leaf } from "lucide-react";

export default function Analytics() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [stats, setStats] = useState({ totalOrders: 0, totalSales: 0, productsSold: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const res = await API.get("/orders");
      const orders = res.data || [];

      let totalSales = 0;
      let totalOrders = orders.length;
      let productsSold = 0;
      const productMap = {};

      orders.forEach((order) => {
        order.items.forEach((item) => {
          totalSales += item.price * item.quantity;
          productsSold += item.quantity;
          const name = item.productId?.name || "Unknown";
          productMap[name] = (productMap[name] || 0) + item.quantity;
        });
      });

      const formatted = Object.entries(productMap).map(([name, qty]) => ({
        name,
        quantity: qty,
      }));

      setStats({ totalOrders, totalSales, productsSold });
      setChartData(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const COLORS = ["#2e7d32", "#66bb6a", "#a5d6a7", "#81c784", "#388e3c"];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white rounded-2xl shadow-md p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Leaf size={26} /> Analytics Dashboard
          </h2>
          <p className="text-gray-600 mt-1">
            Insights about your {user?.role === "farmer" ? "sales" : "purchases"} at a glance 🌿
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ShoppingBasket className="text-primary mx-auto mb-2" size={28} />
          <h3 className="text-3xl font-bold text-primary">{stats.totalOrders}</h3>
          <p className="text-gray-600">Total Orders</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DollarSign className="text-primary mx-auto mb-2" size={28} />
          <h3 className="text-3xl font-bold text-primary">₹{stats.totalSales.toFixed(2)}</h3>
          <p className="text-gray-600">Total Sales</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TrendingUp className="text-primary mx-auto mb-2" size={28} />
          <h3 className="text-3xl font-bold text-primary">{stats.productsSold}</h3>
          <p className="text-gray-600">Units Sold</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-primary mb-4">Top Selling Products</h3>
          {chartData.length === 0 ? (
            <p className="text-gray-500 text-center">No sales data available yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#2e7d32" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-primary mb-4">Sales Distribution</h3>
          {chartData.length === 0 ? (
            <p className="text-gray-500 text-center">No data to visualize yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="quantity"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>
    </div>
  );
}
