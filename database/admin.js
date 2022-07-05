const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  fullname: String,
  username: String,
  password: String,
});

const AdminSchema = mongoose.model("admin", dataSchema);
module.exports = AdminSchema;
