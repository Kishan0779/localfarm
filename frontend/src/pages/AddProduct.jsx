import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, ImagePlus, Save } from "lucide-react";

export default function AddProduct() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    unit: "kg",
    description: "",
    images: [""],
  });

  useEffect(() => {
    if (!user || user.role !== "farmer") {
      alert("Please login as a farmer to add products.");
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const updated = [...form.images];
    updated[index] = e.target.value;
    setForm({ ...form, images: updated });
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const removeImageField = (index) => {
    const updated = [...form.images];
    updated.splice(index, 1);
    setForm({ ...form, images: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/products", form);
      alert("✅ Product added successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Leaf size={28} className="text-primary" />
        <h2 className="text-3xl font-bold text-primary">Add New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="input"
            placeholder="e.g. Organic Tomatoes"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Vegetables"
            className="input"
          />
        </div>

        {/* Price and Quantity Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Unit</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="input"
            >
              <option value="kg">kg</option>
              <option value="litre">litre</option>
              <option value="piece">piece</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="input"
            placeholder="Describe your product, freshness, or source..."
          />
        </div>

        {/* Image URLs */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
            <ImagePlus size={18} className="text-primary" /> Image URLs
          </label>
          {form.images.map((img, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <input
                value={img}
                onChange={(e) => handleImageChange(e, i)}
                placeholder="https://example.com/image.jpg"
                className="input flex-1"
              />
              {form.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(i)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              )}
            </motion.div>
          ))}

          <button
            type="button"
            onClick={addImageField}
            className="text-primary hover:underline text-sm font-medium mt-1"
          >
            + Add another image
          </button>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-green-700 hover:scale-[1.02] transition-transform"
          whileTap={{ scale: 0.97 }}
        >
          <Save size={20} /> Save Product
        </motion.button>
      </form>
    </motion.div>
  );
}
