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



`;
