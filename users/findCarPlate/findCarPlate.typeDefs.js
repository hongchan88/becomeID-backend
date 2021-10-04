import { gql } from "apollo-server-core";

export default gql`
  type FindResult {
    ok: Boolean
    email: String
    car_plates: String
    error: String
  }
  type Query {
    findCarPlate(car_plates: String): FindResult
  }
`;
