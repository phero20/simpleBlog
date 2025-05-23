const User = require("../models/user");

async function signUp(req, res) {
  const { fullname, email, password } = req.body;
  await User.create({
    fullname: fullname,
    email: email,
    password: password,
  });
  return res.redirect("/user/signin");
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
}

module.exports = { signUp, signIn };
