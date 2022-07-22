const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const { typeDefs } = require("./typedefs");
const { resolvers } = require("./resolvers");
const refactorToken = require("./middleware");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = {
      token,
    };
    return user;
  },
});

server.listen().then(({ url }) => {
  dbUrl = "mongodb://127.0.0.1:27017/attendancedb";
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      `failed connecting to the database. ${err}`;
    });
  console.log(`🚀 listening on ${url}`);
});
