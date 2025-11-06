import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card shadow-lg p-4 border-0"
        style={{ width: "100%", maxWidth: 480, borderRadius: 20 }}
      >
        <h3 className="text-center mb-3 fw-bold text-success">🌿 Join LocalFarm</h3>
        <p className="text-center text-muted mb-4">
          Sign up to connect with nearby farmers and fresh produce.
        </p>

        <form onSubmit={submit}>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control form-control-lg"
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control form-control-lg"
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control form-control-lg"
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label fw-semibold">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="form-select form-select-lg"
              >
                <option value="customer">Customer</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="2"
                className="form-control"
                required
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn btn-success w-100 mt-4 py-2 fw-semibold"
            type="submit"
          >
            Register
          </motion.button>
        </form>

        <p className="text-center mt-3 mb-0">
          <span className="text-muted">Already have an account?</span>{" "}
          <Link to="/login" className="text-success fw-semibold">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
