import bcrypt from 'bcrypt';
import  authRepo from '../repositories/auth.repository.js';
import generateTokens from '../utils/jwtTokens.js';

  const register = async (data) =>{
    const existingUser = await authRepo.findUserByEmail(data.email)
    if(existingUser){
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await authRepo.createUser({
       ...data,
        password : hashedPassword ,
        role : 'USER'
    });
    const {accessToken , refreshToken} = generateTokens(user);
    await authRepo.saveRefreshToken(user.id, refreshToken);
    return {user , token : accessToken , refreshToken};

 };

  const login = async (userData) =>{
    const {email , password} = userData ; 
    const user = await authRepo.findUserByEmail(email);
    if(!user){
        throw new Error("Invalid credentials" , 401);
    }
    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch){
        throw new Error("Invalid credentials",401);
    }
    const {accessToken , refreshToken} = generateTokens(user);
    await authRepo.saveRefreshToken(user.id , refreshToken);
        return {user , token : accessToken , refreshToken};

 };

 const updateProfile = async (userEmail , data) =>{
    const user = await authRepo.findUserByEmail(userEmail);
    if(!user){
        throw new Error("User not found",404);
    }
    if(data.email){
        const existingEmail = await authRepo.findUserByEmail(data.email);
    if(existingEmail && existingEmail.id !== user.id){
        throw new Error("Email already in use",400);
}
    }

    const updatedUser = await authRepo.updateUser(user.id , data);
    return updatedUser;
 };

 const changePassword = async (userEmail , currentPassword , newPassword)=>{
    const user = await authRepo.findUserByEmail(userEmail);
    if(!user){
        throw new Error("User not found" , 404);
    }
    const isMatch = await bcrypt.compare(currentPassword , user.password);
    if(!isMatch){
        throw new Error("Current password is incorrect" ,400);
    }
    const hashedPassword = await bcrypt.hash(newPassword,10);
    const updatedUser = await authRepo.updatePassword(user.id , hashedPassword);
    return updatedUser;
 };

 const logout = async (refreshToken) =>{
    const user = await authRepo.findRefreshToken(refreshToken);
    if(!user){
        throw new Error("Invalid refresh token" , 400);
 }
    await authRepo.removeRefreshToken(refreshToken);

};


 export default {
    register,
    login,
    updateProfile,
    changePassword,
    logout
 };