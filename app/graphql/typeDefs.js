const { gql } = require('apollo-server');

const typeDefs = gql`
  type Week {
    _id: ID!
    week: Int!
    year: Int!
    description: String
    type: String!
    hour_ini: String
    hour_end: String
    color: String
  }

  type Task {
    _id: ID!
    _id_week: Week!
    name: String!
    description: String!
    hour_ini: String
    hour_end: String
    type: String!
    user: String
    in_day: String
    finished: Boolean!
  }

  type Query {
    getWeekById(_id: ID!): Week
    getWeeks: [Week]
    getTaskById(_id: ID!): Task
    getTasks: [Task]
    getTasksByWeek(_id_week: String!): [Task!]!
  }
`;

module.exports = typeDefs;