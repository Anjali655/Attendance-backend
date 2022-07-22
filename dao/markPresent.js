const jwt = require("jsonwebtoken");
const AttendanceSchema = require("../database/attendance");
const { refactorToken } = require("../middleware");
const moment = require("moment");
const LoginSchema = require("../database/login");
const AdminSchema = require("../database/admin");

const markAttendance = async (context) => {
  const verify = await refactorToken(context);
  console.log(verify, "verify token");
  if (verify.isAuth === true) {
    const userid = verify.userid;
    const today = moment().format("YYYY-MM-DD");
    let date = today + "T00:00:00.000+00:00";
    let date1 = today + "T23:59:59.999+00:00";
    const checkIfAlready = await AttendanceSchema.find({
      userid: userid,
      signin: { $gte: date, $lt: date1 },
    });

    if (checkIfAlready.length > 0) {
      return {
        data: "Already taken the attendance",
        message: "Already taken attendance",
        status: 201,
      };
    } else {
      const saveData = {
        userid: userid.toString(),
        signin: new Date(),
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

const signOut = async (context) => {
  const verify = await refactorToken(context);
  console.log(verify, "verify token");
  if (verify.isAuth === true) {
    const userid = verify.userid;

    const today = moment().format("YYYY-MM-DD");
    let date = today + "T00:00:00.000+00:00";
    let date1 = today + "T23:59:59.999+00:00";
    const getTodaysAttendance = await AttendanceSchema.findOne({
      userid: userid,
      signin: { $gte: date, $lt: date1 },
    });

    if (getTodaysAttendance?.signout) {
      return {
        data: "Already Signed Out",
        message: "Already Signed Out",
        status: 201,
      };
    } else {
      const saveInside = getTodaysAttendance
        ? await AttendanceSchema.findOneAndUpdate(
            { _id: getTodaysAttendance?._id },
            { signout: new Date() }
          )
        : null;

      if (saveInside) {
        return {
          data: "Signed Out",
          message: "Signed Out",
          status: 200,
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

  if (adminCheck && verify.isAuth) {
    const today = moment().format("YYYY-MM-DD");
    let date = today + "T00:00:00.000+00:00";
    let date1 = today + "T23:59:59.999+00:00";

    const attendance = await AttendanceSchema.find({
      signin: {
        $gte: new Date(date),
        $lt: new Date(date1),
      },
    });

    const sheet = await Promise.all(
      attendance.map(async (value, index) => {
        const userData = await LoginSchema.findById(value.userid).then(
          (data) => {
            return {
              employeeName: data.fullname,
              attendance: value.attendance,
              signIn: moment
                .utc(value.signin)
                .local()
                .format("YYYY-MMM-DD h:mm A"),
              signOut: moment
                .utc(value.signout)
                .local()
                .format("YYYY-MMM-DD h:mm A"),
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

const getAnyAttendance = async (input, context) => {
  console.log(input, "input >>>>>>>>>>>>>>>>>");
  const verify = await refactorToken(context);

  const adminCheck = await AdminSchema.findById(verify.userid);

  if (adminCheck && verify.isAuth) {
    const today = moment(input).format("YYYY-MM-DD");
    let date = today + "T00:00:00.000+00:00";
    let date1 = today + "T23:59:59.999+00:00";

    const attendance = await AttendanceSchema.find({
      signin: {
        $gte: new Date(date),
        $lt: new Date(date1),
      },
    });

    const sheet = await Promise.all(
      attendance.map(async (value, index) => {
        const userData = await LoginSchema.findById(value.userid).then(
          (data) => {
            return {
              employeeName: data.fullname,
              attendance: value.attendance,
              signIn: moment
                .utc(value.signin)
                .local()
                .format("YYYY-MMM-DD h:mm A"),
              signOut: value.signout
                ? moment.utc(value.signout).local().format("YYYY-MMM-DD h:mm A")
                : "",
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

const getTotalEmployee = async (context) => {
  const verify = await refactorToken(context);
  const adminCheck = await AdminSchema.findById(verify.userid);
  if (adminCheck && verify.isAuth) {
    const employeedata = await LoginSchema.find();
    console.log(employeedata);
    return {
      data: employeedata,
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

const getCheckList = async (context) => {
  const verify = await refactorToken(context);
  if (verify.isAuth === true) {
    const userid = verify.userid;
    const today = moment().format("YYYY-MM-DD");
    let date = today + "T00:00:00.000+00:00";
    let date1 = today + "T23:59:59.999+00:00";
    const checkIfAlready = await AttendanceSchema.find({
      userid: userid,
      signin: { $gte: date, $lt: date1 },
    });
    console.log(checkIfAlready);
    if (checkIfAlready.length > 0) {
      return {
        data: "signed in already",
        message: "signed in already",
        status: 200,
      };
    } else {
      return {
        data: "not signed in already",
        message: "not signed in already",
        status: 201,
      };
    }
  } else {
    return {
      data: "unauthorized user",
      message: "unauthorized user",
      status: 400,
    };
  }
};

module.exports = {
  markAttendance,
  signOut,
  getTodayAttendance,
  getTotalEmployee,
  getCheckList,
  getAnyAttendance,
};
