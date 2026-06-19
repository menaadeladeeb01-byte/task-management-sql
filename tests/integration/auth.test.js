import request from 'supertest' ; 
import app from '../../src/app' ;

import pool from '../../src/config/db.js';



describe ('Auth Integration Tests' , ()=>{

afterEach ( async () =>{

   await pool.query('DELETE FROM refresh_tokens');
        await pool.query('DELETE FROM users');
});

afterAll(async () => {
  await pool.end();
}, 30000);

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


})


})