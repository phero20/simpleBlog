const { Router } = require("express");
const multer = require("multer");
const {
  addNewGet,
  addNewPost,
  getBlog,
  getComments,
} = require("../controllers/blog");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get("/addnew", addNewGet);

router.post("/addnew", upload.single("coverImageUrl"), addNewPost);

router.get("/:id", getBlog);
router.post("/comment/:blogId", getComments);

module.exports = router;

