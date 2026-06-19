import {jest , describe , test , beforeEach , expect } from '@jest/globals';
import authService from '../../src/services/auth.service.js';
import authRepository from '../../src/repositories/auth.repository.js';

jest.mock('../../src/repositories/auth.repository.js');

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

    const result = await authService.register(inputData);

    expect(result).toHaveProperty('user' , fakeNewUser);
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('refreshToken');


    expect(authRepository.findUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(authRepository.createUser).toHaveBeenCalledWith(expect.objectContaining({
        name : 'Test User' , 
        email :'test@example.com' , 
        password : expect.any(String)
    }))
    expect(authRepository.saveRefreshToken).toHaveBeenCalledWith(fakeNewUser.id , expect.any(String));


});

})