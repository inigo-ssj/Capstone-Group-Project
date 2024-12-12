const express = require("express");
const dotenv = require("dotenv");
console.log(require("dotenv").config({ path: "../backend/.env" }));
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cartWishlistRoutes = require("./routes/cartWishlistRoutes");

const searchRoutes = require("./routes/searchRoutes");
dotenv.config({ path: "./backend/.env" });

const app = express();
console.log("Mongo URI:", process.env.MONGO_URI); // Debugging log
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api", cartWishlistRoutes);
app.use("/api", searchRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
