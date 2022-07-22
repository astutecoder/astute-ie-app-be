import {gql} from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    id: ID!
    name: String!
    team: [Team!]!
  }

  type Team {
    id: ID!
    name: String!
    domain: String!
  }
`;

export default typeDefs;