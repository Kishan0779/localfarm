import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card shadow-lg p-4 border-0"
        style={{ width: "100%", maxWidth: 420, borderRadius: 20 }}
      >
        <h3 className="text-center mb-3 fw-bold text-success">🌿 LocalFarm</h3>
        <p className="text-center text-muted mb-4">
          Welcome back! Please login to continue.
        </p>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="you@example.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="••••••••"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn btn-success w-100 py-2 fw-semibold"
            type="submit"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center mt-3 mb-0">
          <span className="text-muted">New to LocalFarm?</span>{" "}
          <Link to="/register" className="text-success fw-semibold">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
