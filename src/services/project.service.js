import express from 'express';
import projectRepo from '../repositories/project.repository.js';
import appError from '../utils/appError.js';

const createProject = async (data)=>{
    const projectExinsting = await projectRepo.findProjectByName(data.name);
    if(projectExinsting){
        throw new appError("Project with the same name already exists",400);
    }
    return await projectRepo.createProject(data);
}

const getAllProjects = async (userId)=>{
    return await projectRepo.getAllProjects(userId);
}

const updateProject = async (id , userId , data) =>{
    const project = await projectRepo.findProjectById(id);
    if(!project){
        throw new appError("Project not found",404);
    }
    if(project.user_id !== userId){
        throw new appError("Unauthorized to update this project", 403);
    }
    return await projectRepo.updateProject(id, data);
}

const deleteProject = async (id , userId ) =>{
    const project = await projectRepo.findProjectById(id);
    if(!project){
        throw new appError("Project not found", 404);
    }
    if(project.user_id !== userId){
        throw new appError("Unauthorized to delete this project", 403);
    }
    await projectRepo.deleteProject(id);
}

export default {
    createProject ,
    getAllProjects ,
    updateProject ,
    deleteProject
}