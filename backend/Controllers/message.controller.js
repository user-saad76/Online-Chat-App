 export const CreateMessage = (req,res)=>{
     const data =  req.body;
     console.log('message created',data);
     
    res.json({message:' Create Message endpoint called',data})
}
 export const GetMessage = (req,res)=>{
    res.json({message:' Get Message endpoint called'})
} 
 export const GetMessageById = (req,res)=>{
    res.json({message:' Get Message by id endpoint called'})
}
 export const UpdateMessage = (req,res)=>{
    res.json({message:' Get Message endpoint called'})
}
 export const DeleteMessage = (req,res)=>{
    res.json({message:' Get Message endpoint called'})
}