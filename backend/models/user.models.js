const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, validate: [isEmail] },
    pseudo: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 55,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    picture: { type: String, default: "./uploads/profil/new-user.webp" },
    name: {type: String},
    bio: { type: String, max: 1024 },
    followers: { type: [String] },
    following: { type: [String] },
    likes: { type: [String] },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Mon_app_users", userSchema);
