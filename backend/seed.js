import mongoose from "mongoose";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

import { users, products, orders } from "./demoData.js"; // paste arrays from above here

mongoose
  .connect("mongodb+srv://kishansavani:localfarm0779@localfarm.ea4m8ix.mongodb.net/?appName=LocalFarm")
  .then(async () => {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    await User.insertMany(users);
    await Product.insertMany(products);
    await Order.insertMany(orders);

    console.log("🌾 Demo data inserted successfully!");
    process.exit();
  })
  .catch((err) => console.error(err));
