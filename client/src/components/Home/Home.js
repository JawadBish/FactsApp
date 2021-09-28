import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Facts from '../Facts/Facts'
import Form from '../Form/Form';
import { useDispatch } from 'react-redux'; //dispatch an action
//For Redux, instead of mapping, you can use hooks. 
import { getFacts, getFactsBySearch } from '../../actions/facts.js';
import Pagination from '../Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const styleclass = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);



    const searchFact = () => {
        if (search.trim() || tags) {
            dispatch(getFactsBySearch({ search, tags: tags.join(',') }));
            history.push(`/facts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/')
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            //search for fact
        }
    }


    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));


    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={styleclass.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Facts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={styleclass.appBarSearch} position="static" color="inherit">

                            <TextField name="search"
                                variant="outlined"
                                label="Search Facts"
                                autoComplete='off'
                                onKeyPress={handleKeyPress}
                                value={search}
                                fullWidth
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <br></br>
                            <ChipInput
                                styles={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(tag) => handleAddChip(tag)}
                                onDelete={(tag) => handleDeleteChip(tag)}
                                label='Search Tags'
                                variant="outlined"
                            />
                            <br></br>
                            <Button onClick={searchFact} className={styleclass.searchButton} style={{ backgroundColor: '#990000', color: '#FFFFFF' }} variant="contained" > Search </Button>

                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={styleclass.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
