const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: { type: String, default: "user" },
});
//will add on a field for username and password
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
