const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenses");
const accountRoutes = require("./routes/accountRoutes");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/accounts", accountRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
