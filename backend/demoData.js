export const users = [
  //Admin
  {
    _id: "671a0001f1c2dcb1a1a1a110",
    name: "Admin",
    email: "admin@localfarm.com",
    passwordHash: "$2b$10$YWpoKLhqYZlhOZWxYC9.ouLFN.LA/peGMtx6r4R4yrRupAnlraXs2",
    role: "admin",
    address: "Ahmedabad, Gujarat",
  },
  // Farmers
  {
    _id: "671a0001f1c2dcb1a1a1a111",
    name: "Ravi Patel",
    email: "ravi@localfarm.com",
    passwordHash: "$2b$10$YWpoKLhqYZlhOZWxYC9.ouLFN.LA/peGMtx6r4R4yrRupAnlraXs2",
    role: "farmer",
    address: "Ahmedabad, Gujarat",
  },
  {
    _id: "671a0002f1c2dcb1a1a1a112",
    name: "Neha Shah",
    email: "neha@localfarm.com",
    passwordHash: "$2b$10$YWpoKLhqYZlhOZWxYC9.ouLFN.LA/peGMtx6r4R4yrRupAnlraXs2",
    role: "farmer",
    address: "Surat, Gujarat",
  },
  {
    _id: "671a0003f1c2dcb1a1a1a113",
    name: "Vikas Desai",
    email: "vikas@localfarm.com",
    passwordHash: "$2b$10$YWpoKLhqYZlhOZWxYC9.ouLFN.LA/peGMtx6r4R4yrRupAnlraXs2",
    role: "farmer",
    address: "Vadodara, Gujarat",
  },
  {
    _id: "671a0004f1c2dcb1a1a1a114",
    name: "Priya Joshi",
    email: "priya@localfarm.com",
    passwordHash: "$2b$10$YWpoKLhqYZlhOZWxYC9.ouLFN.LA/peGMtx6r4R4yrRupAnlraXs2",
    role: "farmer",
    address: "Rajkot, Gujarat",
  },
  {
    _id: "671a0005f1c2dcb1a1a1a115",
    name: "Ankit Mehta",
    email: "ankit@localfarm.com",
    passwordHash: "$2b$10$YWpoKLhqYZlhOZWxYC9.ouLFN.LA/peGMtx6r4R4yrRupAnlraXs2",
    role: "farmer",
    address: "Bhavnagar, Gujarat",
  },
  // Customers
  {
    _id: "671a0006f1c2dcb1a1a1a116",
    name: "Kishan Savani",
    email: "kishan@localfarm.com",
    passwordHash: "$2b$10$YWpoKLhqYZlhOZWxYC9.ouLFN.LA/peGMtx6r4R4yrRupAnlraXs2",
    role: "customer",
    address: "Rajkot, Gujarat",
  },
  {
    _id: "671a0007f1c2dcb1a1a1a117",
    name: "Divya Patel",
    email: "divya@localfarm.com",
    passwordHash: "$2b$10$YWpoKLhqYZlhOZWxYC9.ouLFN.LA/peGMtx6r4R4yrRupAnlraXs2",
    role: "customer",
    address: "Ahmedabad, Gujarat",
  },
  {
    _id: "671a0008f1c2dcb1a1a1a118",
    name: "Rohan Shah",
    email: "rohan@localfarm.com",
    passwordHash: "$2b$10$YWpoKLhqYZlhOZWxYC9.ouLFN.LA/peGMtx6r4R4yrRupAnlraXs2",
    role: "customer",
    address: "Surat, Gujarat",
  },
  {
    _id: "671a0009f1c2dcb1a1a1a119",
    name: "Sneha Patel",
    email: "sneha@localfarm.com",
    passwordHash: "$2b$10$YWpoKLhqYZlhOZWxYC9.ouLFN.LA/peGMtx6r4R4yrRupAnlraXs2",
    role: "customer",
    address: "Vadodara, Gujarat",
  },
  {
    _id: "671a0010f1c2dcb1a1a1a120",
    name: "Harsh Mehta",
    email: "harsh@localfarm.com",
    passwordHash: "$2b$10$YWpoKLhqYZlhOZWxYC9.ouLFN.LA/peGMtx6r4R4yrRupAnlraXs2",
    role: "customer",
    address: "Bhavnagar, Gujarat",
  },
];

// -------------------------------------------------
export const products = [
  {
    _id: "671a1111f1c2dcb1a1a1b111",
    name: "Organic Tomatoes",
    category: "Vegetables",
    price: 40,
    quantity: 50,
    unit: "kg",
    description: "Fresh, organic tomatoes grown without pesticides.",
    images: ["https://images.unsplash.com/photo-1604908177521-4020e6f1a0b7"],
    farmerId: "671a0001f1c2dcb1a1a1a111",
  },
  {
    _id: "671a1112f1c2dcb1a1a1b112",
    name: "Farm Fresh Milk",
    category: "Dairy",
    price: 60,
    quantity: 100,
    unit: "litre",
    description: "Pure and fresh cow milk from grass-fed cows.",
    images: ["https://images.unsplash.com/photo-1582719471137-c3967ffb1c1b"],
    farmerId: "671a0002f1c2dcb1a1a1a112",
  },
  {
    _id: "671a1113f1c2dcb1a1a1b113",
    name: "Organic Spinach",
    category: "Leafy Greens",
    price: 30,
    quantity: 60,
    unit: "kg",
    description: "Chemical-free, nutrient-rich spinach leaves.",
    images: ["https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2"],
    farmerId: "671a0001f1c2dcb1a1a1a111",
  },
  {
    _id: "671a1114f1c2dcb1a1a1b114",
    name: "Fresh Mangoes",
    category: "Fruits",
    price: 120,
    quantity: 80,
    unit: "kg",
    description: "Sweet and juicy Kesar mangoes from local orchards.",
    images: ["https://images.unsplash.com/photo-1550258987-190a2d41a8ba"],
    farmerId: "671a0002f1c2dcb1a1a1a112",
  },
  {
    _id: "671a1115f1c2dcb1a1a1b115",
    name: "Free-range Eggs",
    category: "Poultry",
    price: 7,
    quantity: 500,
    unit: "piece",
    description: "Farm fresh eggs from healthy free-range hens.",
    images: ["https://images.unsplash.com/photo-1558818498-28e9aa1a6b9a"],
    farmerId: "671a0003f1c2dcb1a1a1a113",
  },
  {
    _id: "671a1116f1c2dcb1a1a1b116",
    name: "Raw Honey",
    category: "Natural Products",
    price: 450,
    quantity: 40,
    unit: "kg",
    description: "Pure organic honey harvested from local farms.",
    images: ["https://images.unsplash.com/photo-1513639725746-c5d3e861f32a"],
    farmerId: "671a0004f1c2dcb1a1a1a114",
  },
  {
    _id: "671a1117f1c2dcb1a1a1b117",
    name: "Organic Potatoes",
    category: "Vegetables",
    price: 25,
    quantity: 100,
    unit: "kg",
    description: "Locally grown, chemical-free potatoes.",
    images: ["https://images.unsplash.com/photo-1582515073490-dc9e5c8b4d14"],
    farmerId: "671a0001f1c2dcb1a1a1a111",
  },
  {
    _id: "671a1118f1c2dcb1a1a1b118",
    name: "Farm Butter",
    category: "Dairy",
    price: 450,
    quantity: 25,
    unit: "kg",
    description: "Hand-churned butter made from pure cow milk.",
    images: ["https://images.unsplash.com/photo-1621873491089-c7ff9ce2b79f"],
    farmerId: "671a0002f1c2dcb1a1a1a112",
  },
  {
    _id: "671a1119f1c2dcb1a1a1b119",
    name: "Organic Carrots",
    category: "Vegetables",
    price: 35,
    quantity: 70,
    unit: "kg",
    description: "Crisp, sweet carrots perfect for juicing or cooking.",
    images: ["https://images.unsplash.com/photo-1590080875832-13fb70a6c8b8"],
    farmerId: "671a0005f1c2dcb1a1a1a115",
  },
  {
    _id: "671a1120f1c2dcb1a1a1b120",
    name: "Fresh Strawberries",
    category: "Fruits",
    price: 150,
    quantity: 50,
    unit: "kg",
    description: "Juicy and sweet strawberries from local farms.",
    images: ["https://images.unsplash.com/photo-1576402187874-3508c8c9fbb1"],
    farmerId: "671a0004f1c2dcb1a1a1a114",
  }
];

// -------------------------------------------------
export const orders = [
  {
    _id: "671a2221f1c2dcb1a1a1c111",
    customerId: "671a0006f1c2dcb1a1a1a116",
    deliveryAddress: "Rajkot, Gujarat",
    status: "Delivered",
    placedAt: "2025-10-12T10:00:00Z",
    items: [
      { productId: "671a1111f1c2dcb1a1a1b111", price: 40, quantity: 2 },
      { productId: "671a1113f1c2dcb1a1a1b113", price: 30, quantity: 3 }
    ],
    totalAmount: 170
  },
  {
    _id: "671a2222f1c2dcb1a1a1c112",
    customerId: "671a0007f1c2dcb1a1a1a117",
    deliveryAddress: "Ahmedabad, Gujarat",
    status: "Delivered",
    placedAt: "2025-10-14T11:30:00Z",
    items: [
      { productId: "671a1112f1c2dcb1a1a1b112", price: 60, quantity: 2 },
      { productId: "671a1114f1c2dcb1a1a1b114", price: 120, quantity: 1 }
    ],
    totalAmount: 240
  },
  {
    _id: "671a2223f1c2dcb1a1a1c113",
    customerId: "671a0008f1c2dcb1a1a1a118",
    deliveryAddress: "Surat, Gujarat",
    status: "Delivered",
    placedAt: "2025-10-15T09:00:00Z",
    items: [
      { productId: "671a1116f1c2dcb1a1a1b116", price: 450, quantity: 1 },
      { productId: "671a1115f1c2dcb1a1a1b115", price: 7, quantity: 12 }
    ],
    totalAmount: 534
  },
  {
    _id: "671a2224f1c2dcb1a1a1c114",
    customerId: "671a0009f1c2dcb1a1a1a119",
    deliveryAddress: "Vadodara, Gujarat",
    status: "Pending",
    placedAt: "2025-10-20T16:00:00Z",
    items: [
      { productId: "671a1118f1c2dcb1a1a1b118", price: 450, quantity: 1 },
      { productId: "671a1120f1c2dcb1a1a1b120", price: 150, quantity: 2 }
    ],
    totalAmount: 750
  },
  {
    _id: "671a2225f1c2dcb1a1a1c115",
    customerId: "671a0010f1c2dcb1a1a1a120",
    deliveryAddress: "Bhavnagar, Gujarat",
    status: "Delivered",
    placedAt: "2025-10-22T18:00:00Z",
    items: [
      { productId: "671a1119f1c2dcb1a1a1b119", price: 35, quantity: 4 },
      { productId: "671a1111f1c2dcb1a1a1b111", price: 40, quantity: 3 }
    ],
    totalAmount: 265
  }
];
