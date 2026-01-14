const todoModel=require('./../models/todoModel.js');

const createTodoController=async(req,res)=>{

    try{
        const {title,description,createdBy}=req.body;
        if(!title || !description){
            return res.status(400).send({
                success:false,
                message:'Please provide title and description'
            })
        }
        const todo=new todoModel({
            title,
            description,
            createdBy})
         const result= await todo.save();
         res.status(201).send({
            success:true,
            message:'Todo created successfully',
        result}) 
}

catch(error){
    res.status(500).send({
        success:false,
        message:'Error in creating todo',
        error:error.message
    })
}
}

const getTodoController=async(req,res)=>{
try{
    const {userId}=req.params;
    if(!userId){
        return res.status(404).send({
            success:false,
            message:'No user found with this id'
        })
    }
    const todos=await todoModel.find({createdBy:userId});
    if(!todos){
        return res.status(404).send({
            success:false,
            message:'No todos found'
        })
    }
    res.status(200).send({
        success:true,
        message:'Todos fetched successfully',
        todos
    })
}
catch(error){
    res.status(500).send({
        success:false,
        message:'Error in fetching todos',
        error:error.message
    })
}
}

const deleteTodoController=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(404).send({
                success:false,
                message:'No todo found with this id'
            })
        }
        const todo=await todoModel.findByIdAndDelete({_id:id});
        if(!todo){
            return res.status(404).send({
                success:false,
                message:'No todo found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Todo deleted successfully',
        })
    }catch(error){
      console.log(error)
      res.status(500).send({
        success:false,
        message:'Error in deleting todo',
        error:error.message
    })
}
}


const updateTodoController=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(404).send({
                success:false,
                message:'Please provide todo id'
            })
        }
        const data=req.body
        const todo=await todoModel.findByIdAndUpdate(id,{$set:data},{returnOriginal:false});

        if(!todo){
            return res.status(404).send({
                success:false,
                message:'Todonot updated'
            })
        }
        res.status(200).send({
            success:true,
            message:'Todo updated successfully',
            todo
        })
    }
    catch(error){
      console.log(error)
      res.status(500).send({
        success:false,
        message:'Error in updating todo',
        error:error.message
    })
}
}


module.exports={createTodoController,getTodoController,deleteTodoController,updateTodoController};