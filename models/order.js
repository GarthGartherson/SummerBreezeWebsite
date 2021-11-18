const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  cart: {
    type: Object,
    required: true,
  },
  date: Date,
  complete: Boolean,
  address: Object,
});

module.exports = mongoose.model("Order", schema);
