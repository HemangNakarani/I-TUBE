import React from 'react';
import axios from 'axios';
import {Grid} from '@material-ui/core';
import {API_KEY} from '../constants';
import {ListItem} from '../components';
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=13&type=video&key=${API_KEY}&relatedToVideoId=`;
const urls = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&type=video&key=${API_KEY}&q=`;
const urlt = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=24&key=${API_KEY}`;

const getRelatedList = {

    fetch: function(id,mainList,setMainList){

    const num = Math.floor((Math.random() * 12) + 1);

    axios.get(`${url}${id}`)
    .then(({data:{items}})=>{

        if(items.length > 0)
        {
            const returndata = items.map((obj,i)=>{
                if(i===num) localStorage.setItem("pref",obj.id.videoId);
                return (<Grid item xs={12} sm={4} md={3} key={i + mainList.length}>
                            <ListItem title={obj.snippet.title} date={obj.snippet.publishedAt} channel={obj.snippet.channelTitle} url={obj.snippet.thumbnails.high.url} videoid={obj.id.videoId}/>
                        </Grid>)
            });

            setMainList(mainList.concat(returndata));
        }
    });

    },

    fetchRelated: function(id,relatedList,setRelatedList,listToken,setListToken){

        var modifiedurl;
        const num = Math.floor((Math.random() * 24) + 1);

        if(listToken===""){
             modifiedurl =  `${url}${id}`;
        }
        else{
            modifiedurl =  `${url}${id}&pageToken=${listToken}`;
        }

        axios.get(modifiedurl)
        .then(({data:{items,nextPageToken}})=>{

            setListToken(nextPageToken);
            if(items.length > 0)
            {
                const returndata = items.map((obj,i)=>{

                    if(i===num && listToken==="") localStorage.setItem("pref",obj.id.videoId);
                    return (<ListItem key={i + relatedList.length} title={obj.snippet.title} date={obj.snippet.publishedAt} channel={obj.snippet.channelTitle} url={obj.snippet.thumbnails.high.url} videoid={obj.id.videoId}/>)
                    });
        
                setRelatedList(relatedList.concat(returndata)); 
            }
        });
    
    },

    fetchQuery: function(query,queryList,setQueryList,queryToken,setQueryToken){

        var modifiedurl;
        const num = Math.floor((Math.random() * 24) + 1);
        
        if(queryToken===""){
             modifiedurl =  `${urls}${query}`;
        }
        else{
           modifiedurl =  `${urls}${query}&pageToken=${queryToken}`;
        }

        axios.get(modifiedurl)
        .then(({data:{items,nextPageToken}})=>{

            if(items.length > 0)
            {
                setQueryToken(nextPageToken);
                const returndata = items.map((obj,i)=>{
                    if(i===num && queryToken==="") localStorage.setItem("pref",obj.id.videoId);
                    return(
                        <div key={i + queryList.length}>
                            <ListItem title={obj.snippet.title} date={obj.snippet.publishedAt} channel={obj.snippet.channelTitle} url={obj.snippet.thumbnails.high.url} videoid={obj.id.videoId}/>
                        </div>
                        )});

                setQueryList(queryList.concat(returndata)); 
            }
        });
    },

    fetchTrending: function(queryList,setQueryList,queryToken,setQueryToken){

        var modifiedurl;

        if(queryToken===""){
             modifiedurl = urlt;
        }
        else{
           modifiedurl =  `${urlt}&pageToken=${queryToken}`;
        }

        axios.get(modifiedurl)
        .then(({data:{items,nextPageToken}})=>{

            setQueryToken(nextPageToken);
           
            const returndata = items.map((obj,i)=>(
                <div key={i + queryList.length}>
                    <ListItem title={obj.snippet.title} date={obj.snippet.publishedAt} channel={obj.snippet.channelTitle} url={obj.snippet.thumbnails.high.url} videoid={obj.id}/>
                </div>
            ));
    
            setQueryList(queryList.concat(returndata)); 
        });
    }
}

export default getRelatedList ;