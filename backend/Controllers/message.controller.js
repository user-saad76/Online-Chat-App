 import Message from  '../Models/message.model.js' 
  export const CreateMessage = async(req,res)=>{
     const data =  req.body;
       await Message.create(data)
     console.log('message created',data);
     
    res.json({message:' Create Message endpoint called',data})
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