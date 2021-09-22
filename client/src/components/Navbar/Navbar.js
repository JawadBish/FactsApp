import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'
import React from 'react'
import factLogo from '../../images/fact-logo.png';
import useStyles from './styles';
import { Link } from 'react-router-dom'


const Navbar = () => {
    const styleclass = useStyles();
    const user = null;
    return (
        <AppBar className={styleclass.appBar} position="static" color="inherit">
            <div className={styleclass.brandContainer}>
                <Typography component={Link} to="/" className={styleclass.heading} variant="h2" align="center">Fact App</Typography>
                {/* <img className={styleclass.image} src={factLogo} alt="facts" height="60" /> */}
            </div>
            <Toolbar className={styleclass.toolbar}>
                {user ? (
                    <div className={styleclass.profile}>
                        <Avatar className={styleclass.purple} alt={user.result.name} src={user.result.image}> {user.result.name.charAt(0)}</Avatar>
                        <Typography className={styleclass.userName} variant="h6"> {user.result.name}</Typography>
                        <Button variant="contained" className={styleclass.logout} color="secondary"> Logout </Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary"> Signin </Button>
                )}
            </Toolbar>
        </AppBar >
    )
}

export default Navbar
