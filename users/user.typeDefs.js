import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    createdAt: String
    updatedAt: String
    car_plates: String!
    email: String!
    password: String!
  }
  type Mutation {
    createUser(car_plates: String, email: String , password: String): User
  }

  type FindResult {
    ok: Boolean
    email: String
  }
  type Query {
    users: [User]
    findPlate(car_plates: String): FindResult
  }
`;
