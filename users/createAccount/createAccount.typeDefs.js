import { gql } from "apollo-server-core";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      car_plates: String
      email: String!
      password: String!
    ): CreateAccountResult
  }
`;
