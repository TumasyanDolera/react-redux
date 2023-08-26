import React, { useState } from 'react';
import classes from './LogIn.module.css';
import { Link } from 'react-router-dom';
import { useLogInMutation } from '../../../../Redux/Services/UserApi';
import { useNavigate } from 'react-router-dom';

export default function LogIn(){
    const navigate = useNavigate()
    const[LogIn] = useLogInMutation()
    const [LogInData, setLogInData] = useState({
        email: ' ',
        password: ' ',
    })
    const handleRagisterChange = (event) => {
        setLogInData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    const handleLogIn = (e)=>{
        e.preventDefault();
        const {email, password} = LogInData;
        if(!email || !password){
            return;
        }

        LogIn({password})
        .then((res)=>{
            if(res.error) throw new Error('Sign in field !!!');
            if(res.data.token){
                localStorage.setItem('token', res.data.token)
                navigate('/');
            }
        })

    }
    return(
        <div className={classes.content}>
        <div className={classes.img}>
            <img></img>
                
        </div>
        <div className={classes.LogInform}>
        <h1 className={classes.LogInh1}>Enter</h1> 
            <form >
                <input className={classes.LogInInput}
                type="email" 
                name="email"
                value={LogInData.email} 
                placeholder="Enter your email"
                onChange={handleRagisterChange}
                />
                <br/>
                <input className={classes.LogInInput}
                 value={LogInData.password} 
                 type="password" 
                 name="password" 
                 placeholder="Enter your password"
                 onChange={handleRagisterChange}
                 />
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