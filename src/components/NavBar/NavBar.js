import classes from './navBar.module.css'

export default function NavBar(){
    return(
        <div className={classes.navbarContainer}>
            <a>About Us</a>
            <a>Task List</a>
        </div>
    )
}