import React, {Component} from 'react';
import Search from '../Search';

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
            console.log("lets logout in mofo");
            fetch('http://localhost:5000/endsession')
            .then(response => response.json())
            .then((data) => {
                console.log(data.body)
                if(Object.keys(data.body).length === 0){
                    localStorage.removeItem('name')
                }
            });


            //window.location.href = '/login'
        }


        let loggedInUser = localStorage.getItem('name')
            if(loggedInUser == null){
                window.location.href = '/login'
            }

        return(
            <div>
                <Button variant="outlined" onClick={letsLogin}>Login</Button>
                <Button variant="outlined" onClick={letsLogout}>Logout</Button>
                <Search />
            </div>
        )
    }

