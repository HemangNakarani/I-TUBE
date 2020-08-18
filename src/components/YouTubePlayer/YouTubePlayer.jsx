import React,{useEffect,useState, useCallback, useRef} from 'react';
import {Card, Divider, CardHeader , CardActions,CardContent ,Collapse,Avatar,IconButton,Typography,Button,Paper} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles.js';
import styles from './YouTubePlayer.module.scss';
import clsx from 'clsx';
import YouTube from 'react-youtube';
import getVideoDeatils from '../../apicalls/getVideoDeatils';
import getComments from '../../apicalls/getComments';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive'
import { BottomSheet } from '../../components';

export default function YouTubePlayer({videoID})
{
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [title,setTitle] = useState("");
  const [date,setDate] = useState("");
  const [discription,setDiscription] = useState("");
  const [channel,setChannel] = useState("");
  const [viewcount,setViewcount] = useState("");
  const [comments,setComments] = useState([]);
  const [commentToken,setCommentToken] = useState("");

  const isTabletOrMobileDevice = useMediaQuery({ maxWidth: 960 });


    useEffect(()=>{

      getVideoDeatils.fetch(videoID,setTitle,setDate,setDiscription,setChannel,setViewcount);
      getComments.fetch(videoID,comments,setComments,commentToken,setCommentToken);

    },[]);


    const observer = useRef();
    const lastComment = useCallback(node => {

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          getComments.fetch(videoID,comments,setComments,commentToken,setCommentToken);
        }
      });

      if (node) observer.current.observe(node)

    });

  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  

    return (
      <Card className={classes.root} style={{backgroundColor: 'white',}}>
        <YouTube containerClassName={styles.youthub} className={styles.youthubchild} videoId={videoID}/>
        <CardContent>
      <Typography variant="body2" color='primary' component="p">#TheyDon'tGiveMeHashTagData</Typography>
          <Typography variant="h6" color='textPrimary' component="p" style={{fontSize:16}}>{title}</Typography>
          <Typography variant="body1" color='textSecondary' style={{marginTop:10, fontSize:14}} component="p">{`${new Intl.NumberFormat().format(viewcount)} Views  ●  ${moment(date).format('LL')}`}</Typography>
        </CardContent>
        <Divider variant="middle" />
        <CardHeader
            avatar={<Avatar aria-label="recipe" className={classes.avatar}>{channel[0]}</Avatar> }
            title={channel}/>
        <Divider variant="middle" />
        <CardActions disableSpacing>
          <Button aria-label="Show More" onClick={handleExpandClick}>
              <Typography color="textSecondary">{!expanded?"Show Description":"Hide Description"}</Typography>
          </Button>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography style={{whiteSpace:"pre-wrap", fontSize:12}} variant="subtitle1">{discription}</Typography>
          </CardContent>
        </Collapse>

        { !isTabletOrMobileDevice ? 
            <CardContent>
              <Typography>Comments</Typography>
              <Divider style={{marginBottom:20}} variant="fullWidth" />
                {comments.map((comment,i)=>{
                  if(comments.length === i+1) {
                    return <div ref={lastComment} key={i}>{comment}</div> ;
                  }
                  else{
                    return <div key={i}>{comment}</div>;
                  }
                })}
            </CardContent> :
            <CardContent>
            <BottomSheet
            items={comments.map((comment,i)=>{
              if(comments.length === i+1) {
                return <div ref={lastComment} key={i}>{comment}</div> ;
              }
              else{
                return <div key={i}>{comment}</div>;
              }
            })}
            startHidden={true}
            buttonElement={  
              <Paper>
              <div style={{display:"flex", width:"100%"}}>
                  <div style={{display:"flex" , justifyContent:"flex-start", flex:1 , marginLeft:10 , alignItems:"center"}}>
                      <Typography>Comments</Typography>
                  </div>
                  <div style={{display:"flex" , justifyContent:"flex-end", flex:1, marginRight:10}}>
                      <Button style={{margin:5,}}>▲</Button>
                  </div>
              </div>
            </Paper>}/>
            </CardContent>} 
      </Card>
    );
  }