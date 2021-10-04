import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(
      car_plates: String
      email: String
      password: String
    ): editProfieResult
  }

  type editProfieResult {
    ok: Boolean
    error: String
  }
`;
