import express from 'express';
import taskService from '../services/task.service.js';
import appError from '../utils/appError.js';

const createTask = async (req , res , next) =>{
    try{
    const {title , description , project_id } = req.body ;
    const task = await taskService.createTask({ title , description , project_id , user_id : req.user.id});
    res.status(201).json({
        success : true ,
        message : "task is created successfully" ,
         task
    })
    }catch(err){
        next(new appError (err.message , 500));
    }
};

const getAllTasks = async (req ,res , next ) =>{
try{

const tasks = await taskService.getAllTasks(req.user.id);
    res.status(200).json({
        success : true ,
        message : "Tasks retrieved successfully",
        tasks
})

}catch(err){
    next(new appError (err.message , 500))
}
};

const updateTask = async (req , res , next) =>{
    try{

    const task = await taskService.updateTask( req.params.id , req.user.id , req.body )
        res.status(200).json({
            success: true , 
            message : "Task updated successfully" ,
            task
        })

    }catch(err){
        next (new appError (err.message , 500))
    }

}

const deleteTask = async (req , res , next) =>{
    try{
        await taskService.deleteTask(req.params.id , req.user.id)
        res.status(200).json({
            success : true ,
            message : "Task deleted successfully"
        })

    }catch(err){
        next(new appError (err.message , 500))
    }
};

export default {
createTask,
getAllTasks,
updateTask,
deleteTask
};


