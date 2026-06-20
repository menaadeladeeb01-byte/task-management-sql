import request from 'supertest' ; 
import app from '../../src/app' ;
import bcrypt from 'bcrypt';

import pool from '../../src/config/db.js';



describe ('Auth Integration Tests' , ()=>{

afterEach ( async () =>{

   await pool.query('DELETE FROM refresh_tokens');
        await pool.query('DELETE FROM users');
});

afterAll(async () => {

await new Promise(resolve => setTimeout(resolve, 500));
});

test('Post /auth/register - should register a new user and return tokens' , async ()=>{

    const userData = {
        name : 'Test User' ,
        email : 'test@example.com', 
        password : 'Password123'
    };
    const res = await request(app).post('/auth/register')
    .send(userData);
    
expect(res.statusCode).toBe(201);
//console.log(res.statusCode, res.body);
//expect(res.body).toHaveProperty('token');
expect(res.body).toHaveProperty('refreshToken');
expect(res.body.user.email).toBe('test@example.com');

const dbResult = await pool.query('SELECT * FROM users WHERE email = $1', ['test@example.com']);
const userInDb = dbResult.rows[0];

expect(userInDb).toBeTruthy();
expect(userInDb.name).toBe('Test User');


});


test('Post /auth/register - should return 400 if user already exists' , async ()=>{

    const duplicateUser = 'test@example.com';

await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
            ['Old User', duplicateUser, 'hashedPassword', 'USER']
        );

    const userData = {
        name : 'New User' , 
        email : duplicateUser ,
        password : 'Password123'
    };
    const res = await request(app).post('/auth/register')
    .send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User already exists');


});



describe('POST /auth/login' , ()=>{

    test('should login user with valid credentials and return tokens' , async()=>{
    const password = 'Password123';
    const hashPassword = await bcrypt.hash(password , 10);
    await pool.query('insert into users (name , email , password , role) values ($1 , $2 , $3 , $4)' ,
        ['Test User' , 'test@example.com' , hashPassword , 'USER']) ;



    const userData = {
        email : 'test@example.com' , 
        password : 'Password123'
    }

    const res = await request(app).post('/auth/login')
    .send(userData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    //expect(res.body).toHaveProperty('refreshToken');
    expect(res.body.user.email).toBe('test@example.com');


});

test('POST /auth/login - should return 400 if password is incorrect' , async()=>{

    const password = 'Password123';
    const hashPassword = await bcrypt.hash(password , 10);
    await pool.query('insert into users (name , email , password , role) values ($1 , $2 , $3 ,$4) ' , 
        ['Test User' , 'test@example.com' , hashPassword , 'USER'] 
    );

    const userData = {
        email : 'test@example.com',
        password : 'WrongPassword'
    }
    const res = await request(app).post('/auth/login')
    .send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number');


});

});

});