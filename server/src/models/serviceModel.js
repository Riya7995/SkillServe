const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      new: "provider",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("service", serviceSchema);
