import User from  '../Models/user.model.js' 

  export const CreateUser = async(req,res)=>{
       const {title,isPublic} = req.body;
       const image = req.file;
        await User.create(image)
    
      console.log('image created',image);
     
    res.json({message:' Create Message endpoint called',image})
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