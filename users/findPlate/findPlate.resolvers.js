import client from "../../client";

export default {
  Query: {
    findPlate: async (_, { car_plates }) => {
      const result = await client.user.findUnique({
        where: { car_plates },
      });
      const email = result.email;
      return { ok: true, email };
    },
  },
};
