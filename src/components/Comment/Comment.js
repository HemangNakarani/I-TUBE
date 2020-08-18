import React from 'react';
import {Paper, Avatar, Typography } from '@material-ui/core';
import styles from './Comment.module.scss';
import moment from 'moment';

export default function Comment({name,image,date,text}) {

    return (
        <Paper style={{padding:10, marginBottom:5, display:"flex" , justifyContent:"left"}} elevation={3} className={styles.CommentOut}>
                <Avatar style={{display:"inline-block",marginRight:16}} src={image}/>
                <div style={{display:"inline-block"}}>
                    <Typography style={{fontSize:10}} variant="subtitle1" color="textSecondary">{`${name} ◉ ${moment(date).fromNow()}`}</Typography>
                    <Typography style={{fontSize:10 ,whiteSpace:"pre-wrap"}} variant="body1">{text}</Typography>
                </div>
        </Paper>
    );
}
