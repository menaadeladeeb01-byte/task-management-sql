 import appError from "../utils/appError.js";
 function errorHandler(err , req , res , next){
    console.log(err);

    err.statusCode = err.statusCode || 500 ; 
    err.message = err.message || "internal Server Error";

    res.status(err.statusCode).json({
        success : false , 
        message : err.message 
    })
 }
export default errorHandler ;

