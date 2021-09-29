import React, { useState } from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import topCardImg from '../../../images/bbb.png';
import { useDispatch } from 'react-redux';
import { deleteFact, likeFact } from '../../../actions/facts';
import { useHistory } from 'react-router-dom';


const Fact = ({ fact, setCurrentId }) => {
    const styleclass = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(fact?.likes);


    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedFact = fact.likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likeFact(fact._id));

        if (hasLikedFact) {
            setLikes(fact.likes.filter((id) => id !== userId));
        } else {
            setLikes([...fact.likes, userId]);
        }
    };

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openFact = () => {
        history.push(`/facts/${fact._id}`)
    }

    return (

        <Card className={styleclass.card} raised elevation={6} >

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

            <ButtonBase className={styleclass.cardAction} onClick={openFact} >

                <Typography className={styleclass.title}
                    align="center"
                    variant="h6"
                    gutterBottom={true}
                    style={{ textDecoration: 'underline', backgroundColor: '#FFFFFF', color: '#990000' }}>{fact.title}</Typography>
                <div className={styleclass.details}>
                    <Typography body="h6" align="center" gutterBottom={true} >{fact.message} </Typography>
                </div>
                <CardContent>
                    <Typography className={styleclass.category} body="h2" align="center" style={{ backgroundColor: '#990000', color: '#FFFFFF' }} component="p">{fact.category}</Typography>
                    <Typography variant="body2" align="center" style={{ backgroundColor: '#990000', color: '#FFFFFF' }}>{fact.tags.map((tag) => `#${tag} `)}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={styleclass.cardActions}>

                <Button size="small" color="primary" style={{ textTransform: 'none' }} disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>

                {(user?.result?.googleId === fact?.creator || user?.result?._id === fact?.creator) && (

                    <Button size="small" style={{ textTransform: 'none', color: '#fc0313' }} onClick={() => dispatch(deleteFact(fact._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>

                )}

            </CardActions>
        </Card >
    )
}

export default Fact;