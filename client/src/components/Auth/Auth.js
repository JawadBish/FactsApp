import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './styles';
import Input from './Input';
import LockoutlinedIcon from '@material-ui/icons/LockOutlined'

export const Auth = () => {
    const styleclass = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const isSignup = false;


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = () => { };
    const handleChange = () => { };


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
                    </form>
                </Paper>
            </Container>
        </div>
    )
}
