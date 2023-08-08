import classes from './navBar.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';




export default function NavBar() {
    return (
     <nav className='nav'>
    <Link id='Home' to="/About">About Us</Link>
    <Link id='About'to="/">Home</Link>
    <div id='logo'></div>
    </nav>

    )
}