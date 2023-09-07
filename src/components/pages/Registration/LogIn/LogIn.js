import React, { useState } from 'react';
import classes from './LogIn.module.css';
import { Link } from 'react-router-dom';
import { useLogInMutation } from '../../../../Redux/Services/UserApi';
import { useNavigate } from 'react-router-dom';
import { BiSolidError } from "react-icons/bi";
import { Login,Error } from '../../../Toastify/Message';
import { ValidationLogIn } from '../Validation/Validation';
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

export default function LogIn(){
    const navigate = useNavigate()
    const[LogIn] = useLogInMutation()
    const[error,setError] = useState({})
    const[visible,setVisible] = useState (false)

    const [LogInData, setLogInData] = useState({
        email: '',
        password: '',
    })
    const handleRagisterChange = (event) => {
        setLogInData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    const handleLogIn = (e)=>{
        e.preventDefault();
        setError(ValidationLogIn(LogInData));
        const {email, password} = LogInData;
        if(!email || !password){
            return;
        };
        if (!/\S+@\S+\.\S+/.test(LogInData.email)){
            return;
        }

        LogIn({password})
        .then((res)=>{
            if(res.error) throw new Error('Sign in field !!!');
            if(res.data.token){
                localStorage.setItem('token', res.data.token)
                Login()
                navigate('/');
            }
        })

    }
    return(
        <div className={`${classes.content} ${error.password ? classes.LogIn1 : " "}`}>
        <div className={classes.img}>
            <img></img>
                
        </div>
        <div className={classes.LogInform}>
        <h1 className={classes.LogInh1}>Enter</h1> 
            <form >
                { error.email&&
                    <p className={classes.Error4}><BiSolidError icon={BiSolidError} />{error.email}</p>
                }
                <input className = {`${classes.LogInInput} ${error.email ? classes.Error3 : " "}`}
                type = "email" 
                name="email"
                value={LogInData.email} 
                placeholder="Enter your email"
                onChange={handleRagisterChange}
                />
                <br/>
                {error.password &&
                    <p className={classes.Error4}><BiSolidError icon={BiSolidError} /> {error.password}</p>
                }
                <div className={classes.eye2}>
                <input className={`${classes.LogInInput1} ${error.password ? classes.Error3 : " "}`}
                    type={ visible ? "text" : "password" }
                    name="password"
                    value={LogInData.password}
                    placeholder="Enter your Password"
                    onChange={handleRagisterChange} 
                    />
                    <div className="p-2"onClick={()=>setVisible(!visible)}>
                    {visible ? <AiFillEye/> : <AiFillEyeInvisible/>}
                    </div> 
                  </div>
                <br/>
                <input className={classes.Submit}
                type="submit" 
                name="Log In" 
                value="Log In"
                onClick={handleLogIn}/>
                
                
            </form>
            <h5 className={classes.LogInh5}>------ Or ------</h5>
            <h4 className={classes.LogInh4}><p>Don't have an account yet ?</p> <Link to={'/Register'}>Registration</Link></h4>
            
        </div>
    </div>
        
   )
}