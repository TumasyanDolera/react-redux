import classes from './navBar.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../../utils/utils';
import { setAutorization } from '../../Redux/Features/userReducer';
import Confirm from '../Confirm';


export default function NavBar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const successUser = useSelector(state => state.userReducer.successAuthorization);
    const handleLogOut = () =>{
        dispatch(setAutorization(false));
        removeToken();
        if(!getToken()){
            navigate('/LogIn')
        }

    }
    return (
     <nav className={classes.nav}>
    <Link className={classes.Home}id='Home' to="/About">About Us</Link>
    <Link className={classes.About}id='About'to="/">Home</Link>
    <div className={classes.logo}id='logo'></div>
    <button className={classes.LogOut}onClick={handleLogOut}>Log out</button>
    <button className={classes.LogIn} >
        <Link to='/LogIn' className={classes.LogIn}>
            Log in
         </Link>
    </button>
                

    </nav>

    )
}