const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const faturePlanSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },

    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FaturePlan", faturePlanSchema);
