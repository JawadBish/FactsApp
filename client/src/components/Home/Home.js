import { Container, Grid, Grow } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Facts from '../Facts/Facts'
import Form from '../Form/Form';
import { useDispatch } from 'react-redux'; //dispatch an action
//For Redux, instead of mapping, you can use hooks. 
import { getFacts } from '../../actions/facts.js';

const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFacts());
    }, [currentId, dispatch])

    return (
        <Grow in>
            <Container>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Facts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
