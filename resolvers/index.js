const { saveUser, loginUser, loginAdmin, saveAdmin } = require("../dao/login");
const { markAttendance, getTodayAttendance } = require("../dao/markPresent");

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
  },
};

module.exports = { resolvers };
