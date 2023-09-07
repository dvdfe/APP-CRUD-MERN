const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const path = require("path");

mongoose
  .connect(process.env.DB_ADMIN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;
