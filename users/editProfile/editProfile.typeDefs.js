import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(email: String, password: String): editProfieResult
  }

  type editProfieResult {
    ok: Boolean
    error: String
  }
`;
