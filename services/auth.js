const jwt = require("jsonwebtoken");

const secrect = "feroz";

function createTokenForUser(user) {
  const payload = {
    fullname: user.fullname,
    _id: user._id,
    email: user.email,
    profileimageurl: user.profileimageurl,
    role: user.role,
  };
  const token = jwt.sign(payload, secrect);
  return token;
}

function validateTokenForUser(token) {
  const payload = jwt.verify(token, secrect);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateTokenForUser,
};
