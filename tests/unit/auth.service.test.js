import {jest , describe , test , beforeEach , expect } from '@jest/globals';
import authService from '../../src/services/auth.service.js';
import authRepository from '../../src/repositories/auth.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../src/repositories/auth.repository.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('authService _ registerUser' , () => {

beforeEach (() => {
    jest.clearAllMocks();
});

test('should thrw error if user already exists' , async () =>{

    const inputData = { name : 'Test User' , email : 'test@example.com' , password : 'Password123'} ;
    const fakeExistingUser = { id : 1 , name : 'Test User' , email : 'test@example.com' , password : 'Password123' }

    authRepository.findUserByEmail.mockResolvedValueOnce(fakeExistingUser);

    await expect (authService.register(inputData)).rejects.toThrow('User already exists');

    expect(authRepository.createUser).not.toHaveBeenCalled();

});

test('should register user with valid data and return tokens' , async () =>{

    const inputData = {name : 'Test User' , email : 'test@example.com' , password : 'Password123'};
    const fakeNewUser = { id : 1 , name : 'Test User' , email : 'test@example.com' , password : 'hashedPassword'};


    authRepository.findUserByEmail.mockResolvedValueOnce(null);
    authRepository.createUser.mockResolvedValueOnce(fakeNewUser);
    authRepository.saveRefreshToken.mockResolvedValueOnce(true);
    bcrypt.hash.mockResolvedValue('hashedPassword');
    jwt.sign.mockReturnValue('fakeAccessToken');

    const result = await authService.register(inputData);

    expect(result).toHaveProperty('user' , fakeNewUser);
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('refreshToken');


    expect(authRepository.findUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(authRepository.createUser).toHaveBeenCalledWith(expect.objectContaining({
        name : 'Test User' , 
        email :'test@example.com' , 
        password : expect.any(String),
        role : 'USER'
    }))
    expect(authRepository.saveRefreshToken).toHaveBeenCalledWith(fakeNewUser.id , expect.any(String));


});

})

describe('authService _ loginUser' , ()=>{

beforeEach (()=>{
    jest.clearAllMocks();
})


test('should throw error if user does not exist' , async ()=>{

    const inputData = { email : 'test@example.com' , password : 'Password123'} ;
    const fakeExistingUser = {id : 1 , email : 'test@example.com' , password : 'hashedPassword'};

    authRepository.findUserByEmail.mockResolvedValueOnce(null);

    await expect(authService.login(inputData)).rejects.toThrow('Invalid credentials');

    expect(authRepository.saveRefreshToken).not.toHaveBeenCalled();

})

test('should throw error if exist user but password is not match' , async ()=>{

    const inputData = { email : 'test@example.com' , password : 'password123'};
    const fakeExistingUser = { id : 1 , email : 'test@example.com' , password : 'hashedPassword'};

    authRepository.findUserByEmail.mockResolvedValueOnce(fakeExistingUser);
    bcrypt.compare.mockResolvedValueOnce(false);

    await expect(authService.login(inputData)).rejects.toThrow('Invalid credentials');

    expect(authRepository.saveRefreshToken).not.toHaveBeenCalled();

} )

test('should login user successfully with valid credentials and return tokens ' , async () =>{
    const inputData = {email : 'test@example.com' , password : 'Password123'} ; 
    const fakeExistingUser = { id : 1 , email : 'test@example.com' , password : 'hashedPassword'};

authRepository.findUserByEmail.mockResolvedValueOnce(fakeExistingUser);
bcrypt.compare.mockResolvedValueOnce(true);
jwt.sign.mockReturnValueOnce('fakeAccessToken');
authRepository.saveRefreshToken.mockResolvedValueOnce(true);

const result = await authService.login(inputData);

expect(result).toHaveProperty('user');
expect(result).toHaveProperty('token');
expect(result).toHaveProperty('refreshToken');
expect(authRepository.findUserByEmail).toHaveBeenCalledWith('test@example.com');
expect(result.user.email).toBe('test@example.com');

})

});



