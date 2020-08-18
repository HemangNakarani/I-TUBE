
import React,{useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import TrendingUp from '@material-ui/icons/TrendingUp';
import SearchIcon from '@material-ui/icons/Search';
import {useHistory,Link} from'react-router-dom';
import itube from '../../images/itube.png';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '50%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
  },
}));

export default function AppBarSearch() {

  const classes = useStyles();
  const history = useHistory();
  const [searchtext,setSearchtext] = useState('');
  
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar style={{backgroundColor:"black"}} >
         <Link to="/"><img src={itube} alt="i-Tube" style={{width:80}} className={classes.title}/></Link> 
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>{setSearchtext(e.target.value)}}
              onKeyUp={(e)=>{ 
                  if(e.keyCode===13 || e.which===13)
                  { 
                    console.log(searchtext);
                    history.push(`/search/${e.target.value}`);
                  }else
                  {
                    console.log("NOT ENTER");
                  }}
              }
            />
          </div>
          <Link to={`/search/${searchtext}`} style={{textDecoration:'none'}}><Button style={{backgroundColor:"white", fontSize:10,marginRight:12}}>SEARCH</Button></Link>
          <div className={classes.grow} />
          <div style={{display:"flex"}}> 
              <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={()=>{history.push("/trending")}}>
              <TrendingUp/>
              </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
