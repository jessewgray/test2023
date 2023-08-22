import React, {Component} from 'react'
import axios from "axios";

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
        let someName = document.querySelector('.inputName').value;
        let someComment = document.querySelector('.inputComment').value;
        this.setState({
            name: someName,
            comment: someComment
        });
      }
    
      handleSubmit(event) {
        event.preventDefault();

            fetch('http://localhost:5000/post', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              // We convert the React state to JSON and send it as the POST body
              body: JSON.stringify({"name": this.state.name, "comment": this.state.comment})
          }).then(function(response) {
              console.log(response)
              return response.json();
          });

        let showLI = `<li>name: ${this.state.name},  comment: ${this.state.comment}</li>`
        let theUL = window.document.querySelector(".theList")
        theUL.insertAdjacentHTML("afterend", showLI )
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
                    <label>
                    Name:
                    <input className="inputName" type="text" value={this.state.name} name={this.state.name} onChange={this.handleChange} />
                    </label>
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