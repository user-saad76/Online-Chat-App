 import Message from  '../Models/message.model.js' 
  export const CreateMessage = async(req,res)=>{
     const data =  req.body;
       // assume you have user id in req.user from auth middleware
       data.user = req.user.id;
       const message = await Message.create(data)
    // populate user info before sending to socket
       const populatedMessage = await message.populate("user", "name image");

    const socket = req.app.get("socket");
  socket.emit('new-message', populatedMessage);

  res.json({ message:'Message created', data: populatedMessage });
}
 export const GetMessage = async(req,res)=>{
      const Qdata =  req.query;
      const messages =  await Message.find({})
    res.json({message:' Get Message endpoint called',messages })
} 
 export const GetMessageById = async(req,res)=>{
    const {id} = req.params;
     const message = await Message.findById(id)
    console.log('Pdata',id);
    res.json({message:' Get Message by id endpoint called',message})
}
 export const UpdateMessage = async(req,res)=>{
    const {id} = req.params;
    const data = req.body;

    await Message.findByIdAndUpdate(id,data)
    res.json({message:' Get Message endpoint called'})
}
 export const DeleteMessage = async(req,res)=>{
    const {id} = req.params;
    await Message.findByIdAndDelete(id)
    res.json({message:' Get Message endpoint called',id})
}