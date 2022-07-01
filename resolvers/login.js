const { saveUser, loginUser } = require("../dao/login");

const resolvers = {
  Query: {
    empLogin: async (parents, info) => {
    //   console.log(info.input);
      return loginUser(info.input);
    },
  },
  Mutation: {
    empSignup: async (parents, info) => {
      //   console.log(info.input);
      return saveUser(info.input);
    },
  },
};

module.exports = { resolvers };
