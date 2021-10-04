import client from "../../client";

export default {
  Query: {
    findCarPlate: async (_, { car_plates }) => {
      const result = await client.user.findUnique({
        where: { car_plates },
      });
      if (!result) {
        return { ok: false, error: "Car plates not exist in the system" };
      }
      const email = result.email;
      return { ok: true, email, car_plates };
    },
  },
};
