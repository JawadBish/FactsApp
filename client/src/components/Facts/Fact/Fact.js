import React from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import topCardImg from '../../../images/bbb.png';
import { useDispatch } from 'react-redux';
import { deleteFact } from '../../../actions/facts';

const Fact = ({ fact, setCurrentId }) => {
    const styleclass = useStyles();
    const dispatch = useDispatch();
    return (
        <Card className={styleclass.card}>
            {/* <CardMedia className={styleclass.media} title={fact.title}/> */}
            <CardMedia className={styleclass.media} image={topCardImg} title={fact.title} />
            <div className={styleclass.overlay}>
                <Typography variant="h6">{fact.creator}</Typography>
                <Typography variant="body2">{moment(fact.createdAt).fromNow()}</Typography>
            </div>
            <div className={styleclass.overlay2}>
                <Button style={{ color: 'white' }}
                    size="small"
                    onClick={() => setCurrentId(fact._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
                <Typography className={styleclass.title} variant="h6" gutterButtom>{fact.title}</Typography>
            </div>
            <div className={styleclass.details}>
                <Typography className={styleclass.message} variant="body5" gutterButtom>{fact.message}</Typography>

            </div>
            <CardContent>
                <Typography variant="body2" color="textSecondary">{fact.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography className={styleclass.category} variant="h6" gutterButtom>{fact.category}</Typography>
            </CardContent>
            <CardActions className={styleclass.cardActions}>
                <Button size="small" color="primary" onClick={() => { }}>
                    <ThumbUpAltIcon fontSize="small" />
                    Like
                    {fact.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deleteFact(fact._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Fact;