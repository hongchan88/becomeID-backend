import { gql } from "apollo-server-core";


export default gql`  
type FindResult {
    ok: Boolean
    email: String
  }
  type Query {
    users: [User]
    findCarPlate(car_plates: String): FindResult
  }`