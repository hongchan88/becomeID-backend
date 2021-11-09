import client from "../client";

export default {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
    totalPayloads: async ({ id }) => {
      const test = await client.message.count({ where: { roomId: id } });

      return test;
    },
  },

  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};
