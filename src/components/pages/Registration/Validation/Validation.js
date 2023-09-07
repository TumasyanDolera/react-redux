import { Error } from "../../../Toastify/Message";

export  function Validation (RegData){
    const errors = {}
    const emailRegex = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2-6}$/ 
    
    if (RegData.password !== RegData.confirmPassword) {
        errors.confirmPassword = "Password is not the same"
        Error();
      }
    

    if ( RegData.name === "" ){
            errors.name = "Name is required"
            Error();
        }
     
    if (RegData.email === "") {
            errors.email = "Email is required"
            Error();
        } else if (!/\S+@\S+\.\S+/.test(RegData.email)){
            errors.email = "Email is not valid"
            Error();

        }

    if (RegData.password === "") {
            errors.password = "Password is required"
            Error();
        }

   

          return errors;
    }
    
    export  function ValidationLogIn (LogInData){
        const error = {}
        if ( LogInData.password === "" ){
            error.password = "Password is required"
            Error();
        }
     

       if (LogInData.email === "") {
            error.email = "Email is required"
            Error();

        }else if (!/\S+@\S+\.\S+/.test(LogInData.email)){
            error.email = "Email is not valid"
            Error();

        }
        return error;

    }