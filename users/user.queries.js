import client from "../client";

export default {
  Query: {
    findPlate: (_, { car_plates }) => {
      const result = client.user.findFirst({
        where: { car_plates },
      });
      const email = result.then((data) => data.email);
      return { ok: true, email };
    },

  },
};
