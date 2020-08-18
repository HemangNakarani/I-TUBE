import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    width: '100%',
    marginBottom: 20,
  },
});

export default function ListItem({title,date,channel,url,videoid}) {

  const classes = useStyles();

  return (
    <Link to={`/video/${videoid}`} style={{ textDecoration: 'none' }}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image={url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom paragraph={true} style={{fontSize:14}} noWrap >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{fontSize:12}}>
           {channel}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}
