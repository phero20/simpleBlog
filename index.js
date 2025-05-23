require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const { home } = require("./controllers/blog");
const { connectMongoose } = require("./connection");
const { checkForAuthCookie } = require("./middlewares/auth");
connectMongoose(process.env.MONGO_URL);
const PORT = process.env.PORT || 8698;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve("./public")));
app.get("/", home);
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.listen(PORT, () => {
  console.log("started at" + PORT);
});
