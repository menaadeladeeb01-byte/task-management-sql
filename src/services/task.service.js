import taskRepo from '../repositories/task.repository.js';
import appError from '../utils/appError.js';
import projectRepo from '../repositories/project.repository.js';
const createTask = async (data)=>{

    const existingTask = await taskRepo.findTaskByTitle(data.title);
    if(existingTask){
        throw new appError("Task with the same title is already exist" , 400);
    }
    return await taskRepo.createTask(data);
}

const getAllTasks = async (projectId)=>{
return await taskRepo.getAllTasks(projectId);
}

const updateTask = async (id , userId , data)=>{
    const existingTask = await taskRepo.findTaskById(id);
    if(!existingTask){
        throw new appError ("Not found this task" , 404);
    }
    const existingProject = await projectRepo.findProjectById(existingTask.project_id);
    if(!existingProject){
        throw new appError ("Not found this project",404)
    }
   if(existingProject.user_id !== userId){
    throw new appError ("Unauthorized to update this task",403)
   }
    return await taskRepo.updateTask(id,data);
}

const deleteTask = async (id , userId)=>{
    const existingTask = await taskRepo.findTaskById(id);
    if(!existingTask){
        throw new appError("Not found this task",404);
    }
    const existingProject = await projectRepo.findProjectById(existingTask.project_id);
    if(!existingProject){
        throw new appError("Not found this project" , 404);
    }

    if(existingProject.user_id!== userId){
        throw new appError("Unauthorized to delete this task",403)
    }
    return await taskRepo.deleteTask(id);
}

export default {
    createTask,
    updateTask,
    getAllTasks,
    deleteTask
}