import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((c) => c.productId === product._id);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: qty,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to cart!");
    navigate("/cart");
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-primary hover:underline mb-6"
      >
        <ArrowLeft size={18} className="mr-1" /> Back
      </button>

      <motion.div
        className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Product Image */}
        <motion.img
          src={product.images?.[0] || "https://via.placeholder.com/500"}
          alt={product.name}
          className="w-full h-80 object-cover rounded-xl shadow-md"
          whileHover={{ scale: 1.03 }}
        />

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              {product.name}
            </h2>
            <p className="text-gray-500 mb-4">{product.category}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>

            <h3 className="text-2xl font-semibold text-primary mb-4">
              ₹{product.price} <span className="text-gray-500">/ {product.unit}</span>
            </h3>

            <div className="flex items-center gap-3 mb-6">
              <input
                type="number"
                min="1"
                max={product.quantity}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-1 w-20 text-center focus:ring-2 focus:ring-primary"
              />
              <span className="text-gray-600">
                {product.quantity} available in stock
              </span>
            </div>

            <motion.button
              onClick={addToCart}
              className="bg-primary text-white flex items-center gap-2 px-5 py-2 rounded-xl text-lg shadow-md hover:bg-green-700 hover:scale-[1.03] transition-transform"
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={20} /> Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Related Section */}
      <motion.div
        className="mt-12 bg-accent p-6 rounded-2xl shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-primary mb-3">
          🌿 Why buy from LocalFarm?
        </h3>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Support local farmers and sustainable agriculture</li>
          <li>Get fresh and chemical-free produce directly from farms</li>
          <li>Transparent, eco-friendly, and fair pricing</li>
        </ul>
      </motion.div>
    </div>
  );
}
