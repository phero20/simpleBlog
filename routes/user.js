const { Router } = require("express");
const { signIn, signUp } = require("../controllers/user");

const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
