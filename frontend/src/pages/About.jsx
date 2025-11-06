import React from "react";
import { motion } from "framer-motion";
import { Leaf, Users, Truck, Sprout } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-10">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-green-700 mb-3">
          🌿 About LocalFarm
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Connecting farmers directly with local customers — for a sustainable,
          transparent, and community-driven food ecosystem.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <Leaf size={28} className="text-green-600" />
          <h2 className="text-2xl font-semibold text-green-700">
            Our Mission
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          LocalFarm was created to empower local farmers by giving them a fair
          and direct platform to sell their produce to nearby consumers. We aim
          to eliminate middlemen, promote sustainability, and make fresh,
          chemical-free food accessible to every home.
        </p>
      </motion.div>

      {/* Values Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <Users size={28} className="text-green-600" />
          <h2 className="text-2xl font-semibold text-green-700">
            What We Believe In
          </h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Fair pricing for farmers and transparency for consumers.</li>
          <li>
            Supporting local communities through sustainable food systems.
          </li>
          <li>Encouraging organic and eco-friendly farming practices.</li>
          <li>Building stronger farmer–consumer relationships.</li>
        </ul>
      </motion.div>

      {/* Impact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Truck size={28} className="text-green-600" />
          <h2 className="text-2xl font-semibold text-green-700">
            Our Impact
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          Since our start, LocalFarm has helped small-scale farmers reach
          hundreds of customers directly. Together, we’ve reduced food waste,
          encouraged local sourcing, and built a healthier food chain for all.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {[
            { value: "250+", label: "Local Farmers Connected" },
            { value: "1200+", label: "Happy Customers" },
            { value: "5000kg+", label: "Organic Produce Sold" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-green-100 text-green-700 w-56 h-32 flex flex-col justify-center items-center rounded-xl shadow-sm transition"
            >
              <h3 className="text-3xl font-bold">{item.value}</h3>
              <p className="text-sm text-center mt-1 px-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-center text-gray-600 mt-12"
      >
        <Sprout className="mx-auto text-green-600 mb-2" size={28} />
        <p className="italic">
          “When you buy local, you’re not just supporting farmers — you’re
          nurturing the earth and your community.”
        </p>
      </motion.div>
    </div>
  );
}
