import React, {useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';

import useStyles from './styles'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFacts } from '../actions/facts';

const Paginate = ({ page }) => {
    const { numberOfPages }  = useSelector((state) => state.facts)
    const styleclass = useStyles();
    const dispatch = useDispatch();

useEffect(()=> {
    if(page) dispatch(getFacts(page));
},[page])
    return (
        <Pagination 
        styleclass={{ul: styleclass.ul }}
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/facts?page=${item.page}`} />
        )}
        />
    )
}

 export default Paginate;
