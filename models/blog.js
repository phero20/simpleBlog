const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    coverImageUrl: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Fixed typo here
  },
  { timestamps: true }
);

const Blog = mongoose.model("blogs", blogSchema);

module.exports = Blog;
