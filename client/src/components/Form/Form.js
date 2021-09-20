import React, { useState } from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createFact } from '../../actions/facts';
const Form = () => {

    const styleclass = useStyles();
    const [factData, setFactData] = useState({
        creator:'',
        title:'',
        category: '',
        message:'',
        tags:'',
    });

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createFact(factData))
    }


    const clear = () => {
        
    }
    return (
     <Paper className={styleclass.paper}>
         <form autoComplete="off" noValidate className={`${styleclass.root} ${styleclass.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6"> Creating a Fact </Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={factData.creator} onChange={(e) => setFactData({...factData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Fact" fullWidth value={factData.title} onChange={(e) => setFactData({...factData, title: e.target.value })} />
        <TextField name="category" variant="outlined" label="Category" fullWidth value={factData.category} onChange={(e) => setFactData({...factData, category: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth value={factData.message} onChange={(e) => setFactData({...factData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={factData.tags} onChange={(e) => setFactData({...factData, tags: e.target.value })} />
       
        <Button className={styleclass.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
     </Paper>
    );
}

export default Form;