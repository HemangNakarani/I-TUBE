import React from 'react';
import axios from 'axios';
import {API_KEY} from '../constants';
import {Comment} from '../components';
const url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&part=snippet&maxResults=25&videoId=`;

const getComments = {

    fetch: function(id,comments,setComments,commentToken,setCommentToken){

     var modifiedurl;

     if(commentToken===""){
          modifiedurl =  `${url}${id}`;
     }
     else{
        modifiedurl =  `${url}${id}&pageToken=${commentToken}`;
     }
        
    axios.get(modifiedurl)
    .then(({data:{items,nextPageToken}})=>{

        setCommentToken(nextPageToken);
        //console.log(nextPageToken);

        const commentdata = items.map((obj,i)=>(
            <Comment
                key={i + comments.length}
                name={obj.snippet.topLevelComment.snippet.authorDisplayName} 
                image={obj.snippet.topLevelComment.snippet.authorProfileImageUrl}
                date={obj.snippet.topLevelComment.snippet.publishedAt}
                text={obj.snippet.topLevelComment.snippet.textOriginal}
            />
        ));
        setComments(comments.concat(commentdata));
    });

    },
}

export default getComments ;