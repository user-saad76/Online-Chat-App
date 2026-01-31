import User from  '../Models/user.model.js' 

 export const CreateUser = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = {
        public_id: req.file.public_id,
        secure_url: req.file.path,
      };
    }

    const user = await User.create(data);
    console.log("image",req.file);


    res.json({ message: "user created", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

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