import User from  '../Models/user.model.js'
import bcrypt from "bcryptjs";

 export const SignupUser = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = {
        public_id: req.file.public_id,
        secure_url: req.file.path,
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    data.password = hashedPassword;

    const user = await User.create(data);
    console.log("data in backend",data)



    res.json({ message: "user created", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const SignInUser = async (req, res) => {
  try {
   const {email,password} = req.body;
   const user = await User.findOne({email}).select("+password");

   if(!user || user.length === 0 ){
    return res.status(404).json({
      success:false,
      message:'User not found',
    })
   }

   const isMatched = await bcrypt.compare(password,user.password);
   if(!isMatched){
      return res.status(401).json({
        success:false,
        message:'Invaild password'
      })
   }

   console.log('data',user);

   res.json({ message: 'user found', user });
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const GetUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await User.findById(id);
    console.log('Pdata', id);
    res.json({ message: ' Get Message by id endpoint called', User });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await User.findByIdAndUpdate(id, data);
    res.json({ message: ' Get Message endpoint called' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: ' Get Message endpoint called', id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
