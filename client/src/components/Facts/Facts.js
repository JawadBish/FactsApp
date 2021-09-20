import React from 'react'
import { useSelector } from 'react-redux';
import Fact from './Fact/Fact';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';

const Facts = ({ setCurrentId }) => {
    const facts = useSelector((state) => state.facts);
    const styleclass = useStyles();
    console.log(facts)
    return (
        
        facts.length < 0 ? <CircularProgress /> : (
           <Grid className={styleclass.mainContainer} container alignItems="stretch" spacing={3}>
               
              {facts.map((fact) => (
                <Grid key={fact} item xs={12} sm={6}>
                    <Fact fact={fact} setCurrentId={setCurrentId} />  
                </Grid> 
              ))
              
              }
           </Grid>

       )
     
    )
}

export default Facts;