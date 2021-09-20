import React from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
const Fact = ( { fact } ) => {
    const styleclass = useStyles();
    return (
    <Card className={styleclass.card}>
        <CardMedia className={styleclass.media} title={fact.title}/>
        {/* <CardMedia className={styleclass.media} image={sweetMemory} title={memory.title}/> */}
        <div className={styleclass.overlay}>
            <Typography variant="h6">{fact.creator}</Typography>
            <Typography variant="body2">{moment(fact.createdAt).fromNow()}</Typography>
        </div>
        <div className={styleclass.overlay2}>
            <Button style={{color: 'white'}} size="small" onClick={() => {}}>
            <MoreHorizIcon fontSize="default"/>
            </Button>
            </div>
            <div className={styleclass.details}>
            <Typography variant="body2" color="textSecondary">{fact.tags.map((tag) => `#${tag} ` )}</Typography>
            </div>
            <CardContent>
            <Typography  className={styleclass.title} variant="h5" gutterButtom>{fact.message}</Typography>
            </CardContent>
            <CardActions className={styleclass.cardActions}>
        <Button size="small" color="primary" onClick={()=>{}}>
          <ThumbUpAltIcon fontSize="small" />
         Like
         {fact.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={()=> {}}>
          <DeleteIcon fontSize="small" />
         Delete
        </Button>
            </CardActions>
    </Card>
    )
}

export default Fact;