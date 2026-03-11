import AdminMessage from  '../Models/AdminMessages.model.js' 
  export const CreateAdminMessage = async(req,res)=>{
     const data =  req.body;
     const message =  await AdminMessage.create(data)
     console.log(' Admin message created',message);
     const socket = req.server.get("socket")
     socket.emit('new-message', message)
     
    res.json({message:' Create  Admin Message endpoint called',data})
}
 export const GetAdminMessage = async(req,res)=>{
      const Qdata =  req.query;
      const messages =  await AdminMessage.find({})
    res.json({message:' Get  Admin Message endpoint called',messages })
} 
 export const GetAdminMessageById = async(req,res)=>{
    const {id} = req.params;
     const message = await AdminMessage.findById(id)
    console.log('Pdata',id);
    res.json({message:' Get Admin Message by id endpoint called',message})
}
 export const UpdateAdminMessage = async(req,res)=>{
    const {id} = req.params;
    const data = req.body;

    await AdminMessage.findByIdAndUpdate(id,data)
    res.json({message:' Get Admin Message endpoint called'})
}
 export const DeleteAdminMessage = async(req,res)=>{
    const {id} = req.params;
    await AdminMessage.findByIdAndDelete(id)
    res.json({message:' Get Admin Message endpoint called',id})
}