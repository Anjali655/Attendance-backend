const { saveUser, loginUser } = require("../dao/login");

const resolvers = {
  Query: {
    empLogin: async (parents, info) => {
      console.log(info.input);
      return loginUser;
    },
  },
  Mutation: {
    empSignup: async (parents, info) => {
      console.log(info.input);
      return saveUser;
    },
  },
};

module.exports = { resolvers };
