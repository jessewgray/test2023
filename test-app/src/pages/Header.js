
import Button from '@mui/material/Button'

export default function Header(){

        const letsLogin = function(){
            // console.log("lets login in mofo");
            // fetch('http://localhost:5000/auth')
            // .then(response => response.json())
            // .then(data => console.log(data));
            window.location.href = '/login'
        }
        const letsLogout = function(){
            console.log("you're logged out");
            
            //fetch('http://localhost:8080/endsession')
            fetch('https://backend-pigeon.azurewebsites.net/endsession')
            .then(response => response.json())
            .then((data) => {
                console.log(data.body)
                if(Object.keys(data.body).length === 0){
                    localStorage.removeItem('name')
                }
            }).then(function(){
                window.location.reload();
            });


            //window.location.href = '/login'
        }


        let loggedInUser = localStorage.getItem('name')
            if(loggedInUser == null){
                window.location.href = '/login'
            }
        const styleButton = {
            'margin': '0px 5px',
            'color': 'black',
            'borderColor': '#00ff00',
            'color': '#00ff00',
            'textShadow': '1px 2px 2px black',
            'fontFamily': 'Permanent Marker, cursive'
        }
        const welcome = {
            'fontFamily': 'Permanent Marker, cursive'
        }

        return(
            <div>
                <div style={{'marginBottom':'20px'}}>
                    <Button variant="outlined" style={styleButton} onClick={letsLogin}>Login</Button>
                    <Button variant="outlined" style={styleButton} onClick={letsLogout}>Logout</Button>
                </div>
                <div>
                    <p style={welcome}>Welcome back, {localStorage.getItem('name')}</p>
                </div>
            </div>
        )
    }
