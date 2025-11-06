import React, { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { ShoppingBag } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(term)
      // p.category.toLowerCase().includes(term) ||
      // p.description.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-green-50 py-10">
      
      {/* Search Bar */}
      <div className="flex justify-center mb-10 px-4">
        <div className="relative w-full max-w-lg">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search for fresh produce..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full pl-10 pr-5 py-3 shadow-sm border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
      </div>

      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold text-primary mb-2">
          🌾 Fresh from Local Farmers
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Buy fresh, sustainable produce directly from farmers near you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto max-w-7xl px-4">
        {filteredProducts.map((p, i) => (
          <motion.div
            key={p._id || i}
            className="card cursor-pointer hover:scale-[1.03]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <img
              src={p.images?.[0] || "https://via.placeholder.com/300"}
              alt={p.name}
              className="w-full h-48 object-cover rounded-xl"
            />
            <h3 className="text-lg font-semibold mt-3">{p.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{p.category}</p>
            <div className="flex justify-between items-center">
              <p className="text-primary font-bold">
                ₹{p.price}/{p.unit}
              </p>
              <Link to={`/product/${p._id}`}>
                <button className="bg-primary text-white px-3 py-1 rounded-xl flex items-center gap-1 hover:bg-green-700 transition-colors">
                  <ShoppingBag size={16} /> View
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No products found. Farmers will add them soon 🌱
        </p>
      )}
    </div>
  );
}
