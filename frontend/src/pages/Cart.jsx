import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ShoppingCart, CheckCircle2 } from "lucide-react";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));
  const [address, setAddress] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !user._id) {
      alert("Please login before placing order");
      navigate("/login");
      return;
    }

    if (cart.length === 0) return alert("Your cart is empty!");
    if (!address) return alert("Please enter a delivery address.");

    try {
      setIsPlacing(true);
      const items = cart.map((c) => ({
        productId: c.productId,
        quantity: c.quantity,
      }));
      await API.post("/orders", { items, deliveryAddress: address });
      localStorage.removeItem("cart");
      setCart([]);
      alert("✅ Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h1
        className="text-3xl font-bold text-primary mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ShoppingCart /> Your Cart
      </motion.h1>

      {cart.length === 0 ? (
        <motion.div
          className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>Your cart is empty. Start adding fresh produce 🌾</p>
          <button
            onClick={() => navigate("/")}
            className="button mt-4 bg-primary text-white rounded-xl px-4 py-2"
          >
            Back to Shop
          </button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="md:col-span-2 space-y-5">
            {cart.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-md p-4 flex justify-between items-center hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src="https://via.placeholder.com/80"
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary Section */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-primary mb-4">Order Summary</h2>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Delivery</span>
              <span>₹20.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-primary mb-4">
              <span>Total</span>
              <span>₹{(total + 20).toFixed(2)}</span>
            </div>

            <textarea
              placeholder="Enter delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="border border-gray-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-primary mb-4"
            ></textarea>

            <motion.button
              onClick={placeOrder}
              disabled={isPlacing}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 rounded-xl flex justify-center items-center gap-2 ${
                isPlacing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-green-700"
              } text-white font-semibold transition-all`}
            >
              {isPlacing ? (
                "Placing Order..."
              ) : (
                <>
                  <CheckCircle2 size={20} /> Place Order
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
