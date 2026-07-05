const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const listingRoutes = require("./routes/listingRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const universityRoutes = require("./routes/universityRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const projectRequestRoutes = require("./routes/projectRequestRoutes");
const messageRoutes = require("./routes/messageRoutes");
const exchangeRequestRoutes = require("./routes/exchangeRequestRoutes");



dotenv.config();

const app = express();

app.use(cors({
    origin: "https://psychic-orbit-779gxwwq799r3wqqj-5500.app.github.dev"
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));


app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/project-requests", projectRequestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/exchange-requests", exchangeRequestRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
