import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import Input from './Input';
import LockoutlinedIcon from '@material-ui/icons/LockOutlined'
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';
import { useDispatch } from 'react-redux';


export const Auth = () => {
    const styleclass = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = () => { };
    const handleChange = () => { };
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; //cannot get property profileObj 
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error)
        }

    }
    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In was unsuccessfull, Try again later")
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Paper className={styleclass.paper} elevation={3}>
                    <Avatar className={styleclass.avatar}>
                        <LockoutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'} </Typography>
                    <form className={styleclass.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </>
                                )
                            }

                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignup && <Input name="confirmPassowrd" label="Repreat Password" handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={styleclass.submit}>
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin
                            clientId="347502759321-ts8odop4qga9ma8jbabp69855lj3mr1k.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button className={styleclass.googleButton}
                                    color='primary'
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    startIcon={<Icon />}
                                    vartiant="contain">
                                    Google Signin
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? 'Already have an account? Sing In' : "Don't have an account? Sign In"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}
