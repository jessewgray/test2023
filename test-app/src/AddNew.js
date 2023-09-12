import React, {Component} from 'react'

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar'

class AddNew extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            comment: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      

      handleChange(event) {
        // let someName = document.querySelector('.inputName').value;
        let someComment = document.querySelector('.inputComment').value;
        this.setState({
            // name: someName,
            comment: someComment
        });
      }
    
      handleSubmit(event) {
        event.preventDefault();
            let now = new Date;
            let nowString = now.toDateString();

            let user 
            if(localStorage.getItem('name')){
                user = localStorage.getItem('name')
            }else{
                user = 'anonymous'
            }

            localStorage.getItem('name')


            fetch('http://localhost:5000/post', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              // We convert the React state to JSON and send it as the POST body
              body: JSON.stringify({"image": "no image", "name": user, "comment": this.state.comment, "time": nowString})
          }).then(function(response) {
              //console.log(response)
              return response.json();
          });

        let showLI = (<div>
          <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                  <Avatar alt="Remy Sharp" src='' />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>{this.state.someName}</h4>
                  <p style={{ textAlign: "left" }}>{this.state.someComment}</p>
                  <p style={{ textAlign: "left", color: "gray" }}>posted 1 minute ago</p>
              </Grid>
          </Grid>
          <Divider variant="fullWidth" style={{ margin: "30px 0" }} /></div>)
          
        let last = window.document.getElementsByClassName('aComment').length - 1;
        let getLast = window.document.getElementsByClassName('aComment')[last]
        getLast.append(showLI)
        console.log(showLI)
        
        //empty inputs after submit
        this.setState({
            name: "",
            comment:""
        });
        
      }



    render(){
        return(
            <div>
                <p>this is the form section</p>

                <form onSubmit={this.handleSubmit}>
                    {/* <label>
                    Name:
                    <input className="inputName" type="text" value={this.state.name} name={this.state.name} onChange={this.handleChange} />
                    </label> */}
                    <label>
                    Comment:
                    <input className="inputComment" type="text" value={this.state.comment} name={this.state.comment} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default AddNew;