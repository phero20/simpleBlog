const Blog = require("../models/blog");
const Comments = require("../models/comments");
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;


require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function addNewGet(req, res) {
  return res.render("addBlog", {
    user: req.user,
  });
}

async function addNewPost(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const cloudinaryUpload = await new Promise((resolve, reject) => {
      let uploadStream = cloudinary.uploader.upload_stream(
        { folder: "blog_images" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    let blog = await Blog.create({
      title: req.body.title,
      body: req.body.body,
      coverImageUrl: cloudinaryUpload.secure_url,
      createdBy: req.user._id,
    });

    blog = await Blog.findById(blog._id).populate("createdBy");

    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).send("Server Error");
  }
}

async function getBlog(req, res) {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comments.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  return res.render("blogView", {
    user: req.user,
    blog: blog,
    comments: comments,
  });
}

async function getComments(req, res) {
  const comment = await Comments.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
}

async function home(req, res) {
  const allBlogs = await Blog.find({});
  res.render("Home", { user: req.user, blogs: allBlogs });
}
module.exports = { addNewGet, addNewPost, getBlog, getComments, home };
