const { ApolloServer } = require("apollo-server");
const { database } = require("./config/database");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./resolvers/resolvers");

//Launch the server
const server = new ApolloServer({ 
                    typeDefs, 
                    resolvers,
                  });

server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
