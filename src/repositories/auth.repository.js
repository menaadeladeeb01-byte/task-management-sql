import pool  from "../config/db.js";

 const findUserByEmail = async (email)=>{
const res = await pool.query('select * from users where email = $1' , [email]);
return res.rows[0];
}

const findUserById = async (id) =>{
    const res = await pool.query('select * from users where id = $1' , [id]);
    return res.rows[0];
}

 const createUser = async (user ) =>{
    const {name , email , password , role } = user ; 
    const res = await pool.query
    ('insert into users (name , email , password , role ) values ($1 , $2 , $3 , $4 ) returning *' ,
    [name , email , password , role ]);
return res.rows[0];
};

const updateUser = async (id, { name, email }) => {
  const query = `
    update users 
    set name = $1, email = $2 
    where id = $3 
    returning *;
  `;
  const values = [name, email, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

const updatePassword = async (id , hashedPassword) =>{
const res = await pool.query('update users set password = $1 where id = $2 returning *',[hashedPassword , id]);
return res.rows[0];
};

const removeRefreshToken = async (token)=>{
await pool.query('delete from refresh_tokens where token = $1' , [token]);

};
const saveRefreshToken = async (userId , refreshToken)=>{
await pool.query('insert into refresh_tokens (user_id , token) values ($1 , $2 ) ' , [userId , refreshToken]); 

};
const findRefreshToken = async (token) =>{
    const res = await pool.query('select * from refresh_tokens where token = $1' , [token]);
    return res.rows[0]; 
};


export default {
    findUserByEmail , 
    createUser , 
    findUserById ,
    updateUser ,
    updatePassword ,
    removeRefreshToken , 
    saveRefreshToken , 
    findRefreshToken
}

