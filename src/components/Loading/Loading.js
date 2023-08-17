import classes from './Loading.module.css'

export default function Loading() {
    return (
        <div>
        <div className={classes.ldsripple}>
            <div></div>
            <div></div>
            </div>
        <div className={classes.div}>Loading ...</div>
        </div>

        
    )
}