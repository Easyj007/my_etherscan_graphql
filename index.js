// Import necessary modules from Apollo Server and GraphQL
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import the custom EtherDataSource for handling data fetching
const EtherDataSource = require("./datasource/ethDatasource");

// Import the GraphQL schema from schema.graphql
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from a .env file
require("dotenv").config();

// Define resolvers that map to GraphQL queries
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create a new Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,

  // Define data sources as functions to ensure a new instance is created for each request
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Disable the server timeout to handle long-running queries
server.timeout = 0;

// Start the server on port 9000 and log the server URL
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
