import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteroom(id: Int!): DeletedRoom
  }

  type DeletedRoom {
    ok: Boolean!
    error: String
    roomId: Int
  }
`;
