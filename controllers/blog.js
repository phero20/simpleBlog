const Blog = require("../models/blog");
const Comments = require("../models/comments");

function addNewGet(req, res) {
  return res.render("addBlog", {
    user: req.user,
  });
}

async function addNewPost(req, res) {
  try {
    let blog = await Blog.create({
      title: req.body.title,
      body: req.body.body,
      coverImageUrl: `/uploads/${req.file.filename}`,
      createdBy: req.user._id,
    });
    blog = await Blog.findById(blog._id).populate("createdBy");
    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
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
