const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  userid: { type: String },
  signin: { type: Date },
  signout: { type: Date },
  attendance: { type: String },
});

const AttendanceSchema = mongoose.model("attendance", dataSchema);
module.exports = AttendanceSchema;
