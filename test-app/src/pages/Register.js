import React, {Component} from 'react'


class Register extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      

      handleChange(event) {
        let aUsername = document.querySelector('.username').value;
        let aEmail = document.querySelector('.email').value;
        let aPassword = document.querySelector('.password').value;
        this.setState({
            username: aUsername,
            email: aEmail,
            password: aPassword
        });
      }
    
      handleSubmit(event) {
        event.preventDefault();

       
        
         if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
          {
        //fetch('http://localhost:8080/register', {
        fetch('https://backend-pigeon.azurewebsites.net/register', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              // We convert the React state to JSON and send it as the POST body
              body: JSON.stringify({"username": this.state.username, "email": this.state.email, "password": this.state.password})
            }).then(function(response) {
                console.log(response)
                return response.json();
            }).then((data) => {
                console.log(data);
                if(data.email !== ''){
                    window.location.href = '/login'
                }else{
                    console.log('error')
                }
            });
            this.setState({
                username: "",
                email: "",
                password:""
            });
          }else{
            alert("You have entered an invalid email address!")
            return (false)
          }

            
        
      }

    render(){
        return(
            <div>
                <div className='login' style={{ backgroundColor: "#ffb3e1"}}>
                    <form onSubmit={this.handleSubmit}>
                            <label htmlFor="email">
                                <i className='fas fa-envelope'></i>
                            </label>
                            <input className="email" type="text" value={this.state.email} name={this.state.email} onChange={this.handleChange} required/>

                            <label htmlFor="username">
                                <i className='fas fa-user'></i>
                            </label>
                            <input className="username" type="text" value={this.state.username} name={this.state.username} onChange={this.handleChange} required/>

                            <label htmlFor="password">
                                <i className='fas fa-lock'></i>
                            </label>
                            <input className="password" type="password" value={this.state.password} name={this.state.password} onChange={this.handleChange} required/>
                            <input type='submit' value='Register' />
                        </form>
                    </div>
            </div>
        )
    }
}

export default Register;