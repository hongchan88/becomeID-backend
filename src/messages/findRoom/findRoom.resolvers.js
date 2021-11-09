import client from "../../client";
import { protectedResolver } from "../../users/users.utilis";

export default {
  Query: {
    findRoom: protectedResolver(async (_, { id }, { loggedInUser }) => {
      let room = null;
      room = await client.room.findFirst({
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

      if (room === null) {
        return { ok: false };
      } else {
        return { roomId: room.id, ok: true };
      }
    }),
  },
};
