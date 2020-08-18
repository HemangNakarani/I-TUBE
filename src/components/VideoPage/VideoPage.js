import React,{useEffect,useState, useCallback, useRef} from 'react';
import {Grid,Grow} from '@material-ui/core';
import {YouTubePlayer} from '../../components';
import getRelatedList from '../../apicalls/getRelatedList'

export default function VideoPage({match})
{
    
    const [relatedList,setRelatedList] = useState([]);
    const [listToken,setListToken] = useState("");
    const [videoID , setVideoID] = useState("");

    useEffect (()=>{

        setVideoID(match.params.id);
        getRelatedList.fetchRelated(match.params.id,relatedList,setRelatedList,listToken,setListToken);

    },[]);

    const observer = useRef();
    const lastVideo = useCallback(node => {

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          getRelatedList.fetchRelated(videoID,relatedList,setRelatedList,listToken,setListToken);
        }
      });

      if (node) observer.current.observe(node)

    });

    return (
    <Grow in>
       <Grid container spacing={3}>
        <Grid item md={8} sm={12} xs={12}>
            <YouTubePlayer videoID ={match.params.id}></YouTubePlayer>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
            {relatedList.map((videos,i)=>{
              if(relatedList.length === i+1) {
                return <div ref={lastVideo} key={i}>{videos}</div> ;
              }
              else{
                return <div key={i}>{videos}</div>;
              }
            })}
        </Grid>
       </Grid>
     </Grow>
    );
}