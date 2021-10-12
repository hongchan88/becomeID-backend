import client from "../../client";
import { protectedResolver } from "../../users/users.utilis";

export default {
  Query: {
    seeRoom: protectedResolver(async (_, { id }, { loggedInUser }) => {
      let findRoom = null;
      findRoom = await client.room.findFirst({
        where: {
          AND: [
            {
              users: {
                some: {
                  id,
                },
              },
            },

            {
              users: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          ],
        },
      });
      if (findRoom === null) {
        findRoom = await client.room.create({
          data: {
            users: {
              connect: [
                {
                  id,
                },
                {
                  id: loggedInUser.id,
                },
              ],
            },
          },
        });
      }

      return client.room.findFirst({
        where: {
          id: findRoom.id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
    }),
  },
};
