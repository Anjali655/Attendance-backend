const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const { typeDefs } = require("./typedefs/login");
const { resolvers } = require("./resolvers/login");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

server.listen().then(({ url }) => {
  dbUrl = "mongodb://localhost:3000/attendancedb";
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
