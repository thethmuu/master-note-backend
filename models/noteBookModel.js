const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteBookSchema = new Schema(
  {
    name: {
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

module.exports = mongoose.model("NoteBook", noteBookSchema);
