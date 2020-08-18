import axios from 'axios';
import {API_KEY} from '../constants';

const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&key=${API_KEY}&id=`;

const getVideoDetails = {

    fetch: function(id,setTitle,setDate,setDiscription,setChannel,setViewcount){

    axios.get(`${url}${id}`)
    .then(({data:{items}})=>{

        if(items.length)
        {
            setTitle(items[0].snippet.localized.title);
            setDate(items[0].snippet.publishedAt);
            setDiscription(items[0].snippet.description);
            setChannel(items[0].snippet.channelTitle);
            setViewcount(items[0].statistics.viewCount);
        }
        
    })
    }
}

export default getVideoDetails ;