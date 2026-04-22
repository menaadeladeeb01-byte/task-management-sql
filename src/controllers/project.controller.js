import express from 'express';
import projectService from '../services/project.service.js';
import appError from '../utils/appError.js';

const createProject = async (req , res , next) =>{

    try{
const {name , description} = req.body;
const project = await projectService.createProject({name , description});
res.status(201).json({
    success : true ,
    message: "Project created successfully" , 
    project
})
    }catch(err){
        next(new appError(err.message , 500));
    }

};

const getAllProjects = async (req , res , next) =>{
    try{
        const projects = await projectService.getAllProjects(req.user.id);
        res.status(200).json({
            success:true , 
            message : "Projects retrieved successfully",
            projects
        })
    }catch(err){
        next(new appError(err.message , 500));
    }
};

const updateProject = async (req , res , next) =>{
    try{

const updated = await projectService.updateProject(req.params.id , req.body , req.user.id);
res.status(200).json({
    success : true , 
    message : "Project updated successfully " , 
    project : updated
})
    }catch(err){
        next(new appError(err.message , 500));
    }
};


const deleteProject = async (req , res , next ) =>{
    try{
        await projectService.deleteProject(req.params.id , req.user.id);
        res.status(200).json({
            success : true , 
            message : "Project deleted successfully"
        })
    }catch(err){
        next(new appError(err.message , 500));
    }
}

export default {
    createProject ,
    getAllProjects ,
    updateProject ,
    deleteProject
}
