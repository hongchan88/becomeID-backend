import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utilis";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (_, { email, password: newPassword }, { loggedInUser }) => {
        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: { email, ...(hashedPassword && { password: hashedPassword }) },
        });

        if (updatedUser.id) {
          return { ok: true };
        } else {
          return { ok: false, error: "error to update" };
        }
      }
    ),
  },
};
