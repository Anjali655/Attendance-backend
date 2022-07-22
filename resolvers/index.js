const { saveUser, loginUser, loginAdmin, saveAdmin } = require("../dao/login");
const {
  markAttendance,
  getTodayAttendance,
  getTotalEmployee,
  signOut,
  getCheckList,
  getAnyAttendance,
} = require("../dao/markPresent");

const resolvers = {
  Query: {
    empLogin: async (parents, info) => {
      return loginUser(info.input);
    },
    adminLogin: async (parents, info) => {
      return loginAdmin(info.input);
    },
    getTodaysAttendance: async (parent, info, context) => {
      return getTodayAttendance(context);
    },
    getAnyAttendance: async (parent, info, context) => {
      return getAnyAttendance(info.input.date, context);
    },
    getEmpList: async (parent, info, context) => {
      return getTotalEmployee(context);
    },
    checkLogin: async (parent, info, context) => {
      return getCheckList(context);
    },
  },
  Mutation: {
    empSignup: async (parents, info) => {
      return saveUser(info.input);
    },
    adminSignup: async (parents, info) => {
      return saveAdmin(info.input);
    },
    markAttendance: async (parent, info, context) => {
      return markAttendance(context);
    },
    signout: async (parent, info, context) => {
      return signOut(context);
    },
  },
};

module.exports = { resolvers };
