import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-6">
      {/* Animated Icon */}
      <motion.div
        initial={{ rotate: -15, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="mb-4"
      >
        <Leaf size={64} className="text-green-600" />
      </motion.div>

      {/* 404 Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-6xl font-bold text-green-700 mb-2"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold text-gray-700 mb-4"
      >
        Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-500 max-w-md mb-8"
      >
        Oops! The page you’re looking for doesn’t exist or may have been moved.
        Let’s get you back to something fresh 🍃
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Link
          to="/"
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
