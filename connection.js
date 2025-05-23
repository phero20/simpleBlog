const mongoose = require("mongoose");

async function connectMongoose(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports = { connectMongoose };
