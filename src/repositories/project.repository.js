import pool from '../config/db.js';

const findProjectById = async (id)=>{
    const res = await pool.query('select * from projects where id = $1' , [id]);
    return res.rows[0];
}

const findProjectByName = async (name) =>{
    const res = await pool.query('select * from projects where name = $1' , [name]);
    return res.rows[0];
}

const createProject = async (data) =>{
    const {name , description , user_id} = data;
    const res = await pool.query('insert into projects (name , description , user_id) values ($1 , $2 , $3 ) returning *' , 
    [name , description , user_id]);
    return res.rows[0];
}

const getAllProjects = async (userId) =>{
    const res = await pool.query('select * from projects where user_id = $1' , [userId]);
    return res.rows;
}

const updateProject = async (id , data) =>{
    const {name , description } = data ;
    const res = await pool.query('update projects set name = $1 , description = $2 where id = $3 returning *' ,
        [name , description , id]  );
        return res.rows[0];
};

const deleteProject = async (id)=>{
    const res = await pool.query('delete from projects where id = $1' , [id]);
    return res.rowCount;
};

export default {
    findProjectById,
    findProjectByName , 
    getAllProjects, 
    createProject,
    deleteProject,
    updateProject
};
