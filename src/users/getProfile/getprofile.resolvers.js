import client from "../../client";
import { protectedResolver } from "../users.utilis";

export default {
  Query: {
    getprofile: protectedResolver(async (_, args, { loggedInUser }) => {
      const result = await client.user.findUnique({
        where: { id: loggedInUser.id },
      });

      return result;
    }),
  },
};
