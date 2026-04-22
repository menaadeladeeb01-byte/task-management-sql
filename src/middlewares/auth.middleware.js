import jwt from 'jsonwebtoken';
import authRepo from '../repositories/auth.repository.js';
import appError from '../utils/appError.js';

const authMiddelware = async (req , res , next) =>{
    const authHeader = req.headers.authorization ; 
    if(!authHeader || !authHeader.startsWith('Bearer')){
    return next(new appError('Unauthorized - No token provided' , 401));
    } 
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token , process.env.jwt_secret);
        req.user = decoded ;
        next();
    }catch(err){

    next(new appError('Unauthorized - Invalid token' , 401));
}
}
export default authMiddelware ;


