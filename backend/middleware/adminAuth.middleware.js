import jwt from "jsonwebtoken";
export const  isAdminAuthenticated = async(req,res,next)=>{
     const token =  req.cookies['jwt-token-admin'];
     console.log('jwt-token-admin',token);
     
     if(!token){
        return res.status(401).json({message:"You are not authenticated"});
     }
     //token verfication 
  const decoded =  await jwt.verify(token,process.env.JWT_SECRET)
   console.log('decoded',decoded);
   req.admin = decoded;


 next();
}
