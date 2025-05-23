const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/auth");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: { type: String },
    password: { type: String, required: true },
    profileimageurl: {
      type: String,
      default: "/images/user.png",
    },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.salt = randomBytes(16).toString("hex");
  this.password = createHmac("sha256", this.salt)
    .update(this.password)
    .digest("hex");
  next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const userProvidedHash = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (user.password !== userProvidedHash) throw new Error("Incorrect password");

  const token = createTokenForUser(user);
  return token;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
