import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  url: { type: String, required: true },
});

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
