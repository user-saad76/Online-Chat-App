import jwt from "jsonwebtoken";
export const  isAuthenticated = async(req,res,next)=>{
     const token =  req.cookies['jwt-token'];
     console.log('jwt-token',token);
     
     if(!token){
        return res.status(401).json({message:"You are not authenticated"});
     }
     //token verfication 
  const decoded =  await jwt.verify(token,process.env.JWT_SECRET)
   console.log('decoded',decoded);
   req.user = decoded;


 next();
}
