import mongoose from "mongoose";

//schema
const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxLength: 80, minLength: 2 },
    fileUrl: { type: String, required: true },
    description: { type: String, required: true, trim: true, maxLength: 140, minLength: 2 },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
      views: { type: Number, default: 0, required: true },
      rating: { type: Number, default: 0, required: true },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    versionKey: false,
  }
);

// videoSchema.pre('save', async function () {
//this.hashtags = this.hashtags[0].split(',').map((word) => (word.startsWith('#') ? word : `#${word}`));});
videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});
//model
const Video = mongoose.model("Video", videoSchema);

export default Video;
