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

            //localStorage.getItem('name')


            fetch('http://localhost:5000/post', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              // We convert the React state to JSON and send it as the POST body
              body: JSON.stringify({"image": "no image", "name": user, "comment": this.state.comment, "time": nowString})
          }).then(function(response) {
              //console.log(response)
              return response.json();
          });


      
        
        //empty inputs after submit
        this.setState({
            name: "",
            comment:""
        });
        
      }

      

    render(){

        const textAreaStyle={
            'display':'block',
            'margin': 'auto',
            'height': '150px',
            'width': '100%',
            'padding': '5px'
        }
        const formWrap={
            'width':'90%',
            'margin':'auto'
        }
        const inputStyle = {
            'background':'transparent',
            'borderRadius': '5%',
            'border': 'solid 1px black',
            'padding': '5px 15px',
            'fontFamily': 'Permanent Marker, cursive',
            'margin': '15px 0px'
        }

        return(
            <div className="container theBoxShadow">
                <div className="formWrap" style={formWrap}>
                    <form onSubmit={this.handleSubmit}>
                        {/* <label>
                        Name:
                        <input className="inputName" type="text" value={this.state.name} name={this.state.name} onChange={this.handleChange} />
                        </label> */}
                        <label className='theLabel'>
                        Add a Comment:
                        </label>
                        <textarea className="inputComment" type="text" style={textAreaStyle} value={this.state.comment} name={this.state.comment} onChange={this.handleChange} />
                        <div className='submitWrap'>
                            <input type="submit" style={inputStyle} value="Post" />
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default AddNew;