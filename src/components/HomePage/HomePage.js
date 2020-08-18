import React,{useEffect,useState} from 'react';
import {Grid,Grow} from '@material-ui/core';
import getRelatedList from '../../apicalls/getRelatedList';
import debounce from "lodash.debounce";

export default function HomePage()
{

  const [mainList,setMainList] = useState([]);

  useEffect (()=>{

        const pref = localStorage.getItem("pref");

        function fetch()
        {
          if(pref!=null) getRelatedList.fetch( pref,mainList,setMainList);
          else getRelatedList.fetch("dx5AvkckZNc",mainList,setMainList);
        }

        fetch();

  },[])

  window.onscroll = debounce(() => {

    if ((window.innerHeight + Math.ceil(document.documentElement.scrollTop) === document.documentElement.scrollHeight) || (window.innerHeight + Math.floor(document.documentElement.scrollTop)  === document.documentElement.scrollHeight)) {
        const pref = localStorage.getItem("pref");
        getRelatedList.fetch(pref,mainList,setMainList);
    }
  });

    return (
    <Grow in>
       <Grid container spacing={3}>
         {mainList}
       </Grid>
     </Grow>
    );
}