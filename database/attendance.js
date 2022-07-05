const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  userid: { type: String },
  today: { type: String },
  dateTime: { type: Date },
  attendance: { type: String },
});

const AttendanceSchema = mongoose.model("attendance", dataSchema);
module.exports = AttendanceSchema;
