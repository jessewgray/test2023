import React, {useState, useEffect} from 'react'

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar'




function DisplayInfo(){

    const [comments, setComments] = useState('');

         
        let stArray = []
        let getData = function(){
           
            //fetch('http://localhost:8080/get')
            fetch('https://backend-pigeon.azurewebsites.net/get')
                    .then(response => response.json())
                    .then((data) => {
                       // console.log(data.dbArray)
                        data.dbArray.forEach((element) => {
                           stArray.push({image: element.image, name:element.name, comment:element.comment, time: element.time})
                    })
                })
                    .catch(error => console.error(error));    
           }()

            
            const waitList = () => {
                const showNewComments = stArray.map((nextObj, i) => (
                    (<div className="aComment" key={i}>
                    <Grid container wrap="nowrap" spacing={2} >
                        <Grid item>
                            <Avatar alt="" src='' />
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: 'left', 'fontFamily': 'Permanent Marker, cursive'}}>{nextObj.name}</h4>
                            <p style={{ textAlign: "left", color: "gray" }}>{nextObj.time}</p>
                            <p style={{ textAlign: "left" }}>{nextObj.comment}</p>
                        </Grid>
                    </Grid>
                    <Divider variant="fullWidth" style={{ margin: "30px 0" }} /></div>
                    )
                ))
                setComments(showNewComments)
                //console.log(showNewComments)
            }

            useEffect(() => {
                const timer = setTimeout(() => waitList(), 1000);
                return () => clearTimeout(timer);
              }, []);
              
        
        return(
            <div className='container'>                
    
                <Paper style={{ padding: "40px 20px", maxWidth:'90%', margin:'auto' }} className="thePaper">
                    {comments}
                </Paper>
          
            </div>   
        )
    }


export default DisplayInfo;