import React, { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import { Trash2, Search } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const admin = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await API.delete(`/admin/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  // Restrict access
  if (!admin || admin.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-red-500 text-xl font-semibold">
          Access Denied — Admins Only
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Admin Dashboard
        </h2>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search by name, email or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-9 pr-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Table */}
        <motion.table
          className="w-full border-collapse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <thead>
            <tr className="bg-green-100 text-green-800 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-green-50 transition"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No users found.</p>
        )}
      </div>
    </div>
  );
}
