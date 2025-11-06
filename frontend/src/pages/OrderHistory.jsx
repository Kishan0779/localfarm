import React, { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import {
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  Leaf,
  MapPin,
} from "lucide-react";

export default function OrderHistory() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 className="text-green-600" size={22} />;
      case "Shipped":
        return <Truck className="text-blue-500" size={22} />;
      default:
        return <Clock className="text-yellow-500" size={22} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        className="flex items-center gap-2 mb-8 bg-white rounded-2xl shadow-md p-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Leaf size={28} className="text-primary" />
        <div>
          <h2 className="text-3xl font-bold text-primary">
            {user?.role === "farmer" ? "Orders Received" : "Your Orders"}
          </h2>
          <p className="text-gray-600">
            Track and review your {user?.role === "farmer" ? "sales" : "purchases"} 🌿
          </p>
        </div>
      </motion.div>

      {orders.length === 0 ? (
        <motion.div
          className="bg-white p-10 rounded-2xl shadow text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>No orders yet. Once you place or receive an order, it will appear here 🌾</p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order._id || index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <PackageCheck className="text-primary" />
                  <div>
                    <h4 className="font-semibold text-lg text-primary">
                      Order #{order._id.slice(-6)}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(order.placedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.productId?.name || "Deleted Product"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × ₹{item?.productId ? item.productId.price : 0}
                        <>{console.log(item)
                        }</>
                      </p>
                    </div>
                    <p className="text-primary font-semibold">
                      ₹{item.quantity * (item?.productId ? item.productId.price : 0)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Address & Total */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between text-gray-700 mt-3 gap-3">
                <p className="flex items-center gap-2 text-sm md:text-base">
                  <MapPin size={18} className="text-primary" /> {order.deliveryAddress}
                </p>
                <p className="font-bold text-primary text-lg">
                  Total: ₹{order.totalAmount?.toFixed(2) || "0.00"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
