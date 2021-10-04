import client from "../../client";

export default {
  Query: {
    allCarPlate: async (_) => {
      return client.user.findMany();
    },
  },
};
