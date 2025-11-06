import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import FarmerDashboard from './pages/FarmerDashboard';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Analytics from './pages/Analytics';
import OrderHistory from './pages/OrderHistory';
import About from './pages/About';
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Navbar />
      <main className="flex-1 w-full mx-auto px-4 sm:px-8 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/dashboard" element={<FarmerDashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
