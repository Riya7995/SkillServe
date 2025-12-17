const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: ture,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("category", categorySchema);
