import client from "../../client";
import { protectedResolver } from "../../users/users.utilis";

export default {
  Mutation: {
    deleteroom: protectedResolver(async (_, { id }, { loggedInUser }) => {
      if (!loggedInUser) {
        return { ok: false, error: "Please log in" };
      }

      const deletedRoom = await client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });

      if (!deletedRoom) {
        return {
          ok: false,
          error: "can't find room / Not authorized to delete room",
        };
      } else {
        await client.room.delete({ where: { id: deletedRoom.id } });
      }
      return { ok: true, roomId: deletedRoom.id };
    }),
  },
};
