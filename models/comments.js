const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs",
    },
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
     ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("comments", commentsSchema);

module.exports = Comments;
