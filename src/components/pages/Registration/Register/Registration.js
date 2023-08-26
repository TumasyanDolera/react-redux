import React from "react";
import { useState } from "react";
import classes from './Registration.module.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRegisterNewUserMutation } from "../../../../Redux/Services/UserApi";
import { BiSolidError } from "react-icons/bi";

export default function Registration() {

    const [submitRegData] = useRegisterNewUserMutation();
    const [passwordError, setPasswordError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordLenghtError, setPasswordLenghtError] = useState(false);
    const navigate = useNavigate();

    const [RegData, setRegData] = useState({
        name: ' ',
        surname: ' ',
        email: ' ',
        password: ' ',
        confirmPassword: ' ',
    })

    const handleRagisterChange = (event) => {
        setRegData({ ...RegData ,[event.target.name]: event.target.value}
           )
    }
    const handleSubmitReg = (event) => {
        event.preventDefault()
        const { name, surname, email, password, confirmPassword } = RegData;
        console.log(RegData)

        if (!name || !surname || !email || !password || !confirmPassword) {
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError(true);

            return;
        } else {
            setPasswordError(false)
        };

        if (name === " ") {
            setNameError(true);

            return;
        } else {
            setNameError(false)
        };

        if (email === " ") {
            setEmailError(true);

            return;
        } else {
            setEmailError(false)
        };

        if (password.length < 8) {
            setPasswordLenghtError(true);
            return;
        }
        else {
            setPasswordLenghtError(false)
        };


        submitRegData({ name, surname, email, password })
            .then((res => {
                if (res.error) throw new Error('Registration field !!!');
                if (res.data.token) {
                    navigate('/LogIn')
                }
            }))
            .catch((err) => console.log(err))
    }


    return (

        <div className={`${classes.Ragister} ${passwordLenghtError ? classes.Ragister1 : " "}`}>
            <h1 className={classes.Regh1}>Registration</h1>
            <form className={classes.Regform}>
                {
                nameError &&  
                    <p className={classes.Error1}><BiSolidError icon={BiSolidError} /> Name is required</p>
                }
                <input className={`${classes.RegInput} ${nameError ? classes.Error2 : " "}`}
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
                {
                emailError &&
                    <p className={classes.Error1}><BiSolidError icon={BiSolidError} /> Email is required </p>
                }
                <input className={`${classes.RegInput} ${emailError ? classes.Error2 : " "}`}
                    type="email"
                    name="email"
                    value={RegData.email}
                    placeholder="Enter your Email"
                    onChange={handleRagisterChange} />
                <br />
                {passwordLenghtError &&
                    <p className={classes.Error1}><BiSolidError icon={BiSolidError} /> 
                    Password must be least at 8 characters</p>
                    }
                <input className={`${classes.RegInput} ${passwordError ? classes.Error2 : " "}`}
                    type="password"
                    name="password"
                    value={RegData.password}
                    placeholder="Enter your Password"
                    onChange={handleRagisterChange} />
                <br />
                {passwordError &&
                    <p className={classes.Error1}><BiSolidError icon={BiSolidError} /> Password is not a same</p>
                    }
                <input className={`${classes.RegInput} ${passwordError ? classes.Error2 : " "}`}
                    type="password"
                    name="confirmPassword"
                    value={RegData.confirmPassword}
                    placeholder="Confirm password"
                    onChange={handleRagisterChange} />
                <br />
                <input className={classes.RegSubmit}
                    type="submit"
                    value="Register"
                    onClick={handleSubmitReg} />

            </form>
            <h5 className={classes.Regh5}>------ Or ------</h5>
            <h4 className={classes.Regh4}> Have an account ? <Link to={'/LogIn'}> LogIn</Link></h4>

        </div>
    )

}