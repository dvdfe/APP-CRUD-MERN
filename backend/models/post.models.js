const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: { type: String, require: true },
    message: { type: String, require: false, trim: true },
    image: { type: String, require: false },
    video: { type: String, require: false },
    likers: { type: [String] },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mon_app_posts", postSchema);
