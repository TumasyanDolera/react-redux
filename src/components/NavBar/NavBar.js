import classes from './navBar.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../../utils/utils';
import { setAutorization } from '../../Redux/Features/userReducer';
import { FaSignOutAlt } from "react-icons/fa";
import SearchTask from "../../utils/search";
import { useState } from 'react';
import { useSearchTaskQuery } from '../../Redux/Services/API';
import { useDebounce } from "../../utils/customHook";


export default function NavBar() {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const successUser = useSelector(state => state.userReducer.successAuthorization);
    const debounced = useDebounce(searchText)
    const { data: searchResults } = useSearchTaskQuery(debounced);
    
    
    const handleLogOut = () =>{
        dispatch(setAutorization(false));
        removeToken();
        if(!getToken()){
            navigate('/LogIn')
        }}

        const handleSearchChange = (event) => {
            setSearchText(event.target.value)
        }

    
    return (
        
    <nav className={classes.nav}>
        
    <div className={classes.div5}>
    <div className={classes.logo}id='logo'></div>
    <Link className={classes.Home}id='Home' to="/About">About Us</Link>
    <Link className={classes.About}id='About'to="/">Home</Link>
    </div>
    <div>
    <input className={classes.Search}
      type="search" 
      placeholder="Search"
      value={searchText} 
      onChange= {handleSearchChange} />
    {
             searchResults && 
                         <SearchTask tasks={searchResults}  />
     }
     </div>
       <button className={classes.LogOut}onClick={handleLogOut}> <FaSignOutAlt/> Log out</button>
   </nav>

    )
}