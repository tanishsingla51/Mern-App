const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

app.use(cors());

app.use(express.json());

dotenv.config();

const userRoutes = require("./routes/userRoutes");

mongoose
  .connect(process.env.URI)
  .then(() => console.log("MongoDB connected..."));

app.use(userRoutes);

app.listen(process.env.PORT, console.log("Server running on port 8000"));
