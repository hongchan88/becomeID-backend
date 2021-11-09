import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (_, { car_plates, email, password }) => {
      try {
        const existingUser = await client.user.findFirst({
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
        if (existingUser) {
          return {
            ok: false,
            error: "This Email/Car plates is already taken.",
          };
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const createAccount = await client.user.create({
          data: {
            car_plates,
            email,

            password: hashedPassword,
          },
        });

        if (createAccount) {
          return {
            ok: true,
          };
        }
      } catch {
        return {
          ok: false,
          error: "error",
        };
      }
    },
  },
};
