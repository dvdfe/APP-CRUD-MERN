const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user.routes")
const postRoutes = require("./routes/post.routes")

mongoose
  .connect(process.env.DB_ADMIN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
app.use(cookieParser())
app.use(cors({origin: process.env.CLIENT_URL}))
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/user", userRoutes)
app.use("/post", postRoutes)
// app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;