import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export default {
  Mutation: {  

    login: async (_, { email, password }) => {

    const user = await client.user.findFirst({where:{email}});
  
    if(!user){
      return {
        ok: false,
        error:"User not found"
      }
    }
      const passwordCheck = await bcrypt.compare(password, user.password);

    if(!passwordCheck){
      return {
        ok: false ,
        error: "incorrect password"
      }
    }
    const token = await jwt.sign({id: user.email} , process.env.SECRET_KEY)

    return {
      ok: true ,
      token 
    }
    },
  },
};
