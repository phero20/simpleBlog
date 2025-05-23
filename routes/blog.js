const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const {
  addNewGet,
  addNewPost,
  getBlog,
  getComments,
} = require("../controllers/blog");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/addnew", addNewGet);

router.post("/addnew", upload.single("coverImageUrl"), addNewPost);

router.get("/:id", getBlog);

router.post("/comment/:blogId", getComments);

module.exports = router;
