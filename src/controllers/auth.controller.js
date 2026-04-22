import authService from '../services/auth.service.js';
import {validateName , validateEmail , validatePassword , validateRequiredFields} from '../utils/validators.js';



  const register = async (req , res , next) =>{
    try{
    const {name , email , password} = req.body ; 
    const requiredFields = ['name' , 'email' , 'password'];
    if( !validateRequiredFields(req.body , requiredFields)){
        return res.status(400).json({
            success : false , 
            message : "Invalid request , missing required fields"
        })
    }
    if(!validateName(name)){
        return res.status(400).json({
            success : false , 
            message : "Invalid name format"
        }) }
        if(!validateEmail(email)){
            return res.status(400).json({
                success : false , 
                message : "Invalid email format"
            })
        }
        if(!validatePassword(password)){
            return res.status(400).json({
                success : false , 
                message : "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
            })
        }
    
   
const {accessToken , refreshToken , user} = await authService.register(req.body);
        res.status(201).json({success : true , message : "User registered successfully " 
            ,user 
            , token :accessToken 
            , refreshToken
        })
    }
    catch(err){
        next(err);
}};


const login = async (req , res , next ) =>{
    try{
    const requireFields = ['email' , 'password'];

    if(!validateRequiredFields(req.body , requireFields)){
        return res.status(400).json({
            success : false ,
            message : "Invalid request , missing required fields"
        })
    }
const {email , password} = req.body ;
        if(!validateEmail(email)){
            return res.status(400).json ({
                success : false , 
                message : "Invalid email format"
        })}
        if(!validatePassword(password)){
            return res.status(400).json({
                success : false , 
                message : "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
            })
        }
   
        const {token , user } = await authService.login(req.body);
        res.status(200).json({
            success : true , 
            message : "User logged in seccessfully" , user , token 
        })

    }catch(err){
        next(err);
    }};

const getProfile = async (req , res , next ) =>{
    
    try{
        res.status(200).json({
            success : true , 
            message : "User profile fetched seccessfully" ,
            user : req.user
        })

    } catch(err){
        next(err);
    }
};
const updateProfile = async (req , res , next ) =>{
    try{
    const {name , email} = req.body ; 
    if(name && !validateName(name)){
        return res.status(400).json({
            success : false , 
            message : "Invalid name format"
        })
    }
    if(email && !validateEmail(email)){
        return res.status(400).json({
            success : false , 
            message : "Invalid email format"
        })
    }

    
        const updated = await authService.updateProfile(req.user.id , req.body);
        res.status(200).json({
            success : true , 
            message : "User profile updated seccessfully" ,
            user : updated
        })

    }catch(err){
        next(err);
    } } ;

const changePassword = async (req , res , next) =>{
    try{
const {currentPassword , newPassword , confirmPassword} = req.body ;
const requiredFields = ['currentPassword' , 'newPassword' , 'confirmPassword'] ;

        if(!validateRequiredFields(req.body, requiredFields)){
            return res.status(400).json({
                success : false ,
                message : "Invalid request , missing required fields"
            })
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success : false , 
                message : "New password and confirm password do not match"
             })
        }
          if(!validatePassword(newPassword)){
            return res.status(400).json({
                success : false , 
                message : "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
            })
          }
        

        await authService.changePassword(req.user.id , req.body);
        res.status(200).json({
            success : true , 
            message : "User password updated seccessfully" 
        })

    }
    catch(err){
        next(err);
    }
};

const logout = async (req , res , next ) =>{
    try{
        await authService.logout(req.body.refreshToken);

        res.status(200).json({
            success : true , 
            message : "User logged out seccessfully"
        })

    }catch(err){
        next(err);
    }
}

export default{
    register , 
    login , 
    getProfile ,
    updateProfile , 
    changePassword , 
    logout
}
