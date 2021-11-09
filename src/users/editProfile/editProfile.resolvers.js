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
        
        const editValue = () => "sldkfj"
        console.log(editValue)

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
          return { ok: false, error: "Car plate / email is already exist" , value: `${car_plates !== undefined ? "car_plates" : "email"}` };
        }

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            car_plates,
            email,
            ...(hashedPassword && { password: hashedPassword }),
          },
        });

        if (updatedUser.id) {
          return { ok: true , value: `${car_plates !== undefined ? "car_plates" : "email"}`  };
        } else {
          return { ok: false, error: "error to update" };
        }
      }
    ),
  },
};
