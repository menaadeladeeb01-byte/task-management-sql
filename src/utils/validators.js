const validateEmail = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const validatePassword = (password) =>{
    if(!password || password.length < 6 ) return false ; 

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasUpperCase && hasLowerCase && hasNumber ; 

}

const validateName = (name ) =>{
    if (!name || name.length < 2 || name.length > 50) return false ; 
    return /^[a-zA-Z\s]+$/.test(name);

}

const validateRequiredFields = (data , requiredFields) =>{

if(!data || !requiredFields || !Array.isArray(requiredFields) ) {
    return false ; 
}
for(const field of requiredFields){
    if( data[field] === undefined || data[field] === null || data[field] === "" )
        return false ; 
}
return true ; 
}

const validateProject= (data) =>{
    const errors =[];
    const {name , description} = data ; 
    if(!name || name.length < 3 || name.length > 100){
      errors.push("Name must be between 3 and 100 characters");
    }
    if(description && description.length > 500){
        errors.push("Description must be less than 500 characters");
       
    }
    return errors ; 
}

const validateTask = (data) =>{
    const errors =[];
    const {title , description } = data ; 
    if(!title || title.length < 3 || title.length > 100){
        errors.push("Title must be between 3 and 100 characters");
    }
    if(description && description.length > 500){
        errors.push("Description must be less than 500 characters");
    }
    return errors ; 
}


export default {
    validateEmail , 
    validatePassword , 
    validateName , 
    validateRequiredFields  ,
    validateProject ,
    validateTask
}
    