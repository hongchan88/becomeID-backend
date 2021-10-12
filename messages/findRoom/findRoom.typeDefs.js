import { gql } from "apollo-server-core";

export default gql`
  type Query {
    findRoom(id: Int!): FindRoomResult
  }

  type FindRoomResult {
    roomId: Int
    ok: Boolean
  }
`;
