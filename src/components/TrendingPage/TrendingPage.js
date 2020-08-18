import React,{useEffect,useState, useCallback, useRef} from 'react';
import {Grid,Grow} from '@material-ui/core';
import getRelatedList from '../../apicalls/getRelatedList';

export default function TrendingPage()
{
    
    const [queryList,setQueryList] = useState([]);
    const [queryToken,setQueryToken] = useState("");

    useEffect (()=>{

        const fetch = ()=>{
          getRelatedList.fetchTrending(queryList,setQueryList,queryToken,setQueryToken);
        } 

        fetch();
    },[]);

    const observer = useRef();
    const lastVideo = useCallback(node => {

    if(observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          getRelatedList.fetchTrending(queryList,setQueryList,queryToken,setQueryToken);
        }
      });

      if (node) observer.current.observe(node)

    });

    return (
    <Grow in>
       <Grid container spacing={3}>
        {queryList.map((videos,i)=>{

              if(queryList.length === i+1) {
                return <Grid item xs={12} sm={4} md={3} key={i}  ref={lastVideo} >{videos}</Grid>
              }
              else{
                return <Grid item xs={12} sm={4} md={3} key={i}>{videos}</Grid>
              }
        })}
       </Grid>
     </Grow>
    );
}