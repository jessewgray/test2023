import React, {Component} from 'react'

import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';


class Comment extends Component{
    render(){

        const styles = {
            ma:{
                margin: 'auto'
            },
            bg: {
                background: 'white',
                color:'black'
              }
          };

        const name = (<h1>jesse gray</h1>)
        const comment = (<p>this is whree the message will be</p>)
        const message = (<div>{name}{comment}</div>)
        const post = (<SnackbarContent style={styles.bg} message={message}/>)


        const aList = ['jesse', 'holly', 'frank', 'ali']
        const showNames = aList.map((name) => (
            <li key={name}>{name}</li>
        ))

        return(
            <div>
                <Stack spacing={2} sx={{ maxWidth: '80%' }} style={styles.ma}>
                   {post}
                </Stack>
                <ul>{showNames}</ul>
            </div>
        )
    }
}

export default Comment;