import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const links = [];
  links.push({ name: "Home", path: "/" });
  links.push({ name: "About", path: "/about" });
  if(user && user.role === "farmer") {
    links.push({ name: "Analytics", path: "/analytics" });
    links.push({ name: "Dashboard", path: "/dashboard" });
  } else if (user && user.role === "customer") {
    links.push({ name: "Orders", path: "/orders" });
    links.push({ name: "Cart", path: "/cart" });
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="text-green-600" size={26} />
          <span className="text-xl font-bold text-green-700">LocalFarm</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-700 hover:text-green-600 transition font-medium"
            >
              {link.name}
            </Link>
          ))}

          {user && user._id ? (
            <>
              <span className="text-gray-500 text-sm">
                Hi, {user.name || ""}
              </span>
              <button
                onClick={logout}
                className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 text-sm"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-green-700"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-2xl z-50 flex flex-col p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Leaf className="text-green-600" size={24} />
                  <span className="text-lg font-semibold text-green-700">
                    LocalFarm
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-green-700"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-700 hover:text-green-600 font-medium border-b border-gray-100 pb-2"
                  >
                    {link.name}
                  </Link>
                ))}

                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="mt-6 bg-green-600 text-white py-2 rounded-lg text-center hover:bg-green-700"
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Footer info */}
              <div className="mt-auto pt-6 text-xs text-gray-500 border-t border-gray-100">
                © {new Date().getFullYear()} LocalFarm — All rights reserved.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
