import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import factLogo from './images/fact-logo.png';
import Facts from './components/Facts/Facts.js';
import Form from './components/Form/Form.js';
import useStyles from './styles';

import { useDispatch } from 'react-redux'; //dispatch an action
//For Redux, instead of mapping, you can use hooks. 

import {getFacts} from './actions/facts.js';


const App = () => {
    const styleclass = useStyles();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getFacts());
    },[dispatch])

    return(
        <Container maxWidth="lg">
            <AppBar className={styleclass.appBar} position="static" color="inherit">
                <Typography className={styleclass.heading} variant="h2" align="center">Fact App.</Typography>
                <img className={styleclass.image} src={factLogo} alt="memories" height="60"/>
            </AppBar>
            <Grow in>
                <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Facts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
        
    );

    
}

export default App;