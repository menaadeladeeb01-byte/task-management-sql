import jwt from 'jsonwebtoken';
import authRepo from '../repositories/auth.repository.js';

const generateTokens = (user)=>{
    const accessToken = jwt.sign({
        id:user.id , role : user.role },process.env.jwt_secret , {expiresIn : `1h`});

    const refreshToken = jwt.sign ({id : user.id , role : user.role},process.env.jwt_secret ,{expiresIn : '7d'});
        return {accessToken , refreshToken};
    
}

export default generateTokens ;