const jwt = require("jsonwebtoken");
const AttendanceSchema = require("../database/attendance");
const { refactorToken } = require("../middleware");
const moment = require("moment");
const LoginSchema = require("../database/login");
const AdminSchema = require("../database/admin");

const markAttendance = async (context) => {
  const verify = await refactorToken(context);
  if (verify.isAuth === true) {
    const userid = verify.userid;

    const today = moment().format("DD-MM-YYYY");
    const checkIfAlready = await AttendanceSchema.find({
      userid: userid,
      today: today.toString(),
    });

    if (checkIfAlready.length > 0) {
      return {
        data: "Already taken the attendance",
        message: "Already taken attendance",
        status: 200,
      };
    } else {
      const saveData = {
        userid: userid.toString(),
        today: today.toString(),
        dateTime: new Date(),
        attendance: "present",
      };

      const saveInside = await AttendanceSchema(saveData).save();
      if (saveInside) {
        return {
          data: "Attendance Marked",
          message: "Attendance Marked",
          status: 200,
        };
      } else {
        return {
          data: "Error occured, Try again later",
          message: "Error occured, Try again later",
          status: 400,
        };
      }
    }
  } else {
    return {
      data: null,
      message: "unauthorised user",
      status: 400,
    };
  }
};

const getTodayAttendance = async (context) => {
  const verify = await refactorToken(context);

  const adminCheck = await AdminSchema.findById(verify.userid);

  console.log(adminCheck, "adminCheck");
  if (adminCheck && verify.isAuth) {
    const today = moment().format("DD-MM-YYYY");
    const checkIfAlready = await AttendanceSchema.find({
      today: today.toString(),
    });

    const sheet = await Promise.all(
      checkIfAlready.map(async (value, index) => {
        const userData = await LoginSchema.findById(value.userid).then(
          (data) => {
            console.log(data);
            return {
              employeeName: data.fullname,
              attendance: value.attendance,
              date: value.today,
            };
          }
        );
        return userData;
      })
    );

    return {
      data: sheet,
      message: "attendance sheet",
      status: 200,
    };
  } else {
    return {
      data: null,
      message: "unauthorized user",
      status: 400,
    };
  }
};

module.exports = { markAttendance, getTodayAttendance };
