import React , {useEffect} from 'react'
import { Paper, Typography, CircularProgress, Divider} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import useStyles from './styles';
import { getFact, getFactsBySearch } from '../../actions/facts';
import aeImage from '../../images/ae.jpg';
const FactDetails = () => {
    
  const { fact, facts, isLoading } = useSelector((state) => state.facts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getFact(id));
  },[id]);

  useEffect(() => {
    if (fact) {
      dispatch(getFactsBySearch({ search: 'none', tags: fact?.tags.join(',') }));
    }
  }, [fact]);

  if (!fact) return null;

  const openFact = (_id) => history.push(`/facts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  console.log("FF",facts);
  const recommendedFacts = facts.filter(({ _id }) => _id !== fact._id);
  console.log("rec",recommendedFacts);
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{fact.message}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{fact.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{fact.category}</Typography>
          <Typography variant="h6">Created by: {fact.name}</Typography>
          <Typography variant="body1">{moment(fact.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={aeImage} alt={fact.createdAt} />
        </div>
      </div>
      {recommendedFacts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedFacts.map(({ name, message, likes, _id,tags }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openFact(_id)} key={_id}>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <Typography gutterBottom variant="subtitle2">{tags.map((tag) => `#${tag}`)}</Typography>
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default FactDetails
