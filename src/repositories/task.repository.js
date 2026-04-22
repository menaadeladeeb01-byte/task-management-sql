import pool from '../config/db.js';

const findTaskById = async (id)=>{
    const res = await pool.query('select * from tasks where id = $1' , [id]);
    return res.rows[0];
}

const findTaskByTitle = async (title) =>{
    const res = await pool.query('select * from tasks where title = $1 ' , [title]);
    return res.rows[0];
}

const createTask = async (data) =>{
    const {title , description , project_id} = data ;
    const res = await pool.query ('insert into tasks (title , description , project_id ) values ($1 , $2 , $3) returning* '
        ,[title , description , project_id]);
        return res.rows[0];
}

const getAllTasks = async (projectId)=>{
const res = await pool.query ('select * from tasks where project_id = $1' , [projectId]);
return res.rows;
}

const updateTask = async (id , data)=>{
    const {title , description} = data ; 
    const res = await pool.query ('update tasks set title = $1 , description = $2 where id = $3 returning*' ,
        [title ,description , id]
    );
    return res.rows[0];
}

const deleteTask = async (id) =>{
    const res = await pool.query('delete from tasks where id = $1' , [id]);
    return res.rowCount;
}

export default {
    findTaskById , 
    findTaskByTitle , 
    createTask, 
    deleteTask, 
    updateTask,
    getAllTasks 
}