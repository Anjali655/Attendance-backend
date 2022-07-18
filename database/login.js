const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  fullname: String,
  username: String,
  password: String,
  department: String,
  mobile: String
});

const LoginSchema = mongoose.model("info", dataSchema);
module.exports = LoginSchema;
