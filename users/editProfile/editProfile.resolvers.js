import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utilis";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { car_plates, email, password: newPassword },
        { loggedInUser }
      ) => {
        console.log(loggedInUser);
        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }

        const checkCarplate = await client.user.findFirst({
          where: {
            OR: [
              {
                email,
              },
              {
                car_plates,
              },
            ],
          },
        });

        if (checkCarplate) {
          return { ok: false, error: "Car plate / email is already exist" };
        }

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            car_plates,
            email,
            ...(hashedPassword && { password: hashedPassword }),
          },
        });
        console.log(updatedUser);
        if (updatedUser.id) {
          return { ok: true };
        } else {
          return { ok: false, error: "error to update" };
        }
      }
    ),
  },
};
