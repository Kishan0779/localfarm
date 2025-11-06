import React, { useEffect, useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Trash2, BarChart3, Leaf } from "lucide-react";

export default function FarmerDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "farmer") {
      alert("Please login as a farmer to access this page.");
      navigate("/login");
      return;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/products?farmerId=${user._id}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white rounded-2xl shadow-md p-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Leaf size={26} /> {user?.farmName || "Farmer"} Dashboard
          </h2>
          <p className="text-gray-600 mt-1">
            Manage your farm products and track sales performance.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <Link to="/add-product">
            <button className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-xl shadow hover:bg-green-700 transition-transform hover:scale-105">
              <PlusCircle size={18} /> Add Product
            </button>
          </Link>
          <Link to="/analytics">
            <button className="bg-white border border-primary text-primary flex items-center gap-2 px-4 py-2 rounded-xl shadow hover:bg-primary hover:text-white transition-colors">
              <BarChart3 size={18} /> View Analytics
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <motion.div
          className="text-center bg-white rounded-2xl shadow-md p-10 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>No products yet. Start by adding your first one 🌿</p>
          <Link to="/add-product">
            <button className="bg-primary text-white mt-4 px-5 py-2 rounded-xl hover:bg-green-700 transition-colors">
              + Add Product
            </button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-4 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <img
                src={p.images?.[0] || "https://via.placeholder.com/220"}
                alt={p.name}
                className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="mt-3">
                <h3 className="text-lg font-semibold text-primary">{p.name}</h3>
                <p className="text-gray-500 text-sm">{p.category}</p>
                <p className="text-gray-700 mt-1">
                  ₹{p.price}/{p.unit}
                </p>
                <p className="text-sm text-gray-600">Stock: {p.quantity}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/product/${p._id}`}
                  className="bg-primary text-white text-sm px-4 py-2 rounded-xl hover:bg-green-700 transition-colors"
                >
                  View
                </Link>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
