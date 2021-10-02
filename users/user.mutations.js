import client from "../client";
import bcrypt from "bcrypt";


export default {
  Mutation: {
    createUser: async (_, { car_plates, email ,password }) => {
      try {
        const existingUser = await client.user.findFirst({
            where: {
                OR: [
                    {
                        email,
                    },{
                        car_plates,
                    }
                ]
            }
          });
          if(existingUser){
            throw new Error("This Email/Car plates is already taken.")
    
          }
          const hashedPassword = await bcrypt.hash(password, 10);
     
          return client.user.create({
            data: {
              car_plates,
              email,
    
              password: hashedPassword,
            },
          });
      } catch {

      }
    },
  },
};
