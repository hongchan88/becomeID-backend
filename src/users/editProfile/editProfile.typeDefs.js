import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(
      car_plates: String
      email: String
      password: String
    ): editProfileResult
  }

  type editProfileResult {
    ok: Boolean
    error: String
    value: String
  }
`;
