import User from  '../Models/user.model.js' 
//import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//     const uniqueName = `category-${Date.now()}${exis}`;
//     cb(null,uniqueName)
//   },
// });








  export const CreateUser = async(req,res)=>{
     const data =  req.body;
      const file = req.files
       await User.create(data)
     console.log('user created',data);
     
    res.json({message:' Create Message endpoint called',data})
}
 export const GetUser = async(req,res)=>{
      const Qdata =  req.query;
      const User =  await User.find({})
    res.json({message:' Get Message endpoint called',User })
} 
 export const GetUserById = async(req,res)=>{
    const {id} = req.params;
     const User = await User.findById(id)
    console.log('Pdata',id);
    res.json({message:' Get Message by id endpoint called',User})
}
 export const UpdateUser = async(req,res)=>{
    const {id} = req.params;
    const data = req.body;

    await User.findByIdAndUpdate(id,data)
    res.json({message:' Get Message endpoint called'})
}
 export const DeleteUser = async(req,res)=>{
    const {id} = req.params;
    await User.findByIdAndDelete(id)
    res.json({message:' Get Message endpoint called',id})
}