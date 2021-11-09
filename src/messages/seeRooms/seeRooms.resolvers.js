import client from "../../client";
import { protectedResolver } from "../../users/users.utilis";

export default {
  Query: {
    seeRooms: protectedResolver(async (_, __, { loggedInUser }) =>
      client.room.findMany({
        where: {
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
        include : {
          users : true,

        }
       
      })
    ),
  },
};