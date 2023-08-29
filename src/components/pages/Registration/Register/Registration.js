import React from "react";
import { useState } from "react";
import classes from './Registration.module.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRegisterNewUserMutation } from "../../../../Redux/Services/UserApi";
import { BiSolidError } from "react-icons/bi";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Register, Error } from "../../../Toastify/Message";
import { Validation } from "../Validation/Validation";

export default function Registration() {

    const [submitRegData] = useRegisterNewUserMutation();
    const [errors, setErrors] = useState({})
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();

    const [RegData, setRegData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleRagisterChange = (event) => {
        setRegData({ ...RegData ,[event.target.name]: event.target.value}
           )
    }
   
    const handleValidation = (event) =>{
        event.preventDefault();
        setErrors(Validation(RegData));
        const { name, surname, email, password, confirmPassword } = RegData;
        
        if (!name || !surname || !email || !password || !confirmPassword) {
            return;
        }

        submitRegData({ name, surname, email, password })
            .then((res => {
                if (res.error) throw new Error('Registration field !!!');
                if (res.data.token) {
                    navigate('/LogIn')
                    Register()
                }
            }))
            .catch((err) => console.log(err))
        }
    
return (

        <div className={`${classes.Ragister} ${errors.password ? classes.Ragister1 : " "}`}>
            <h1 className={classes.Regh1}>Registration</h1>
            <form className={classes.Regform}>
                {errors.name &&  
                    <p className={classes.Error1}><BiSolidError icon={BiSolidError}/>{errors.name}</p>
                }
                <input className={`${classes.RegInput} ${errors.name ? classes.Error2 : " "}`}
                    type="text"
                    name="name"
                    value={RegData.name}
                    placeholder = "Enter your name"
                    onChange={handleRagisterChange} />
                <br />
                <input className={classes.RegInput}
                    type="text"
                    name="surname"
                    value={RegData.surname}
                    placeholder="Enter your Surname"
                    onChange={handleRagisterChange} />
                <br />
                {errors.email &&  
                    <p className={classes.Error1}><BiSolidError icon={BiSolidError}/>{errors.email}</p>
                }
                <input className={`${classes.RegInput} ${errors.email ? classes.Error2 : " "}`}
                    type="email"
                    name="email"
                    value={RegData.email}
                    placeholder="Enter your Email"
                    onChange={handleRagisterChange} />
                <br />
                {errors.password &&  
                    <p className={classes.Error1}><BiSolidError icon={BiSolidError}/>{errors.password}</p>
                }
            <div className={classes.eye}>
                <input className={`${classes.RegInput1} ${errors.password ? classes.Error2 : " "}`}
                    type={ visible ? "text" : "password" }
                    name="password"
                    value={RegData.password}
                    placeholder="Enter your Password"
                    onChange={handleRagisterChange} 
                    /><div className="p-2"onClick={()=>setVisible(!visible)}>
                    {visible ? <AiFillEye/> : <AiFillEyeInvisible/>}
                    </div> 
            </div>
                 {errors.confirmPassword &&  
                    <p className={classes.Error1}><BiSolidError icon={BiSolidError}/>{errors.confirmPassword}</p>
                }
                
            <div className={classes.eye1 }>
                <input className={`${classes.RegInput1} ${errors.confirmPassword ? classes.Error2 : " "}`}
                    type={ visible ? "text" : "password" }
                    name="confirmPassword"
                    value={RegData.confirmPassword}
                    placeholder="Confirm password"
                    onChange={handleRagisterChange} />
                    <div className="p-2"onClick={()=>setVisible(!visible)}>
                    {visible ? <AiFillEye/> : <AiFillEyeInvisible/>}
                    </div> 
           </div> 
                <input className={classes.RegSubmit}
                    type="submit"
                    value="Register"
                    onClick={handleValidation} />

            </form>
            <h5 className={classes.Regh5}>------ Or ------</h5>
            <h4 className={classes.Regh4}> Have an account ? <Link to={'/LogIn'}> LogIn</Link></h4>

        </div>
    )

}