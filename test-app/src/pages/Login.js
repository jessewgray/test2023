import React, {Component} from 'react';



class Login extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      

      handleChange(event) {
        let aUsername = document.querySelector('.username').value;
        let aPassword = document.querySelector('.password').value;
        this.setState({
            username: aUsername,
            password: aPassword
        });
      }
    
      handleSubmit(event) {
        event.preventDefault();
            fetch('http://localhost:5000/auth', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              // We convert the React state to JSON and send it as the POST body
              body: JSON.stringify({"username": this.state.username, "password": this.state.password})
          }).then(function(response) {
              console.log(response)
              return response.json();
          }).then((data) => {
            console.log(data);
            if (data.loggedin == true){
                
                //console.log(data.username)
                let user = data.username;
                localStorage.setItem(
                    'name', user
                )
                window.location.href = "/"
            }else{
                console.log('wrong pw duder')
            }
          });

       
        this.setState({
            username: "",
            password:""
        });
        
      }


    render(){
        return(
            <div>
                <p>this is the login page</p>

                <div className='login' style={{ backgroundColor: "#435165"}}>
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="username">
                            <i className='fas fa-user'></i>
                        </label>
                        <input className="username" type="text" value={this.state.username} name={this.state.username} onChange={this.handleChange} required/>
                        <label htmlFor="password">
                            <i className='fas fa-lock'></i>
                        </label>
                        <input className="password" type="password" value={this.state.password} name={this.state.password} onChange={this.handleChange} required/>
                        <a href="/register" style={{color: "white"}}>Create a new account</a>
                        <input type='submit' value='submit' />
                    </form>
                </div>
                
            </div>
        )
    }
}

export default Login;