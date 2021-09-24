import React from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import topCardImg from '../../../images/bbb.png';
import { useDispatch } from 'react-redux';
import { deleteFact, likeFact } from '../../../actions/facts';

const Fact = ({ fact, setCurrentId }) => {
    const styleclass = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (fact.likes.length > 0) {
            return fact.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{fact.likes.length > 2 ? `You and ${fact.likes.length - 1} others` : `${fact.likes.length} like${fact.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{fact.likes.length} {fact.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        } else {

            return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
        }
    };

    return (
        <Card className={styleclass.card}>
            {/* <CardMedia className={styleclass.media} title={fact.title}/> */}
            <CardMedia className={styleclass.media} image={topCardImg} />
            <div className={styleclass.overlay}>
                <Typography variant="h6">{fact.name}</Typography>
                <Typography variant="body2">{moment(fact.createdAt).fromNow()}</Typography>
            </div>
            <div className={styleclass.overlay2}>
                {(user?.result?.googleId === fact?.creator || user?.result?._id === fact?.creator) && (
                    <Button style={{ color: 'white' }}
                        size="small"
                        onClick={() => setCurrentId(fact._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                )}

            </div>
            <Typography className={styleclass.title} align="center" variant="h6" gutterBottom={true} >{fact.title}</Typography>
            <div className={styleclass.details}>
                <Typography body="h6" align="center" gutterBottom={true} >{fact.message} </Typography>
            </div>
            <CardContent>
                <Typography variant="body2" color="textSecondary">{fact.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography className={styleclass.category} body="h2" color='textSecondary' component="p">{fact.category}</Typography>
            </CardContent>
            <CardActions className={styleclass.cardActions}>
                <Button size="small" color="primary" style={{ textTransform: 'none' }} disabled={!user?.result} onClick={() => dispatch(likeFact(fact._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === fact?.creator || user?.result?._id === fact?.creator) && (

                    <Button size="small" style={{ textTransform: 'none', color: '#fc0313' }} onClick={() => dispatch(deleteFact(fact._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>

                )}

            </CardActions>
        </Card>
    )
}

export default Fact;