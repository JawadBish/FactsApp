import React from 'react'
import { useSelector } from 'react-redux';
import Fact from './Fact/Fact';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';

const Facts = ({ setCurrentId }) => {
    const { facts, isLoading } = useSelector((state) => state.facts);
    const styleclass = useStyles();

    console.log("FACTS", facts);

    if (isLoading) {
        return (<>
            <CircularProgress />
        </>)
    }

    else {
        if (facts?.length < 1 || facts === 'undefined') {
            return (<>
                <h1 className={styleclass.h1} style={{ backgroundColor: '#FFFFFF', color: '#990000' }}>No Facts Found</h1>
            </>)
        }
    }





    return (
        facts?.length < 1 ? <CircularProgress /> : (
            <Grid className={styleclass.mainContainer} container alignItems="stretch" spacing={3}>
                {facts?.map((fact) => (
                    <Grid key={fact._id} item xs={12} sm={12} md={6} lg={4}>
                        <Fact fact={fact} setCurrentId={setCurrentId} />
                    </Grid>
                ))

                }
            </Grid>

        )

    )
}

export default Facts;