import React, {Component} from'react'
import { useState, useEffect } from 'react';

export default function Search(){

    const [message, setMessage] = useState('');
    
 
   
        
        useEffect(() => {
            fetch('http://localhost:5000/get')
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data.dbArray)
                    })
                    .catch(error => console.error(error));    
        }, []);

        const handleChange = (event) => {
            // Get input value from "event"
            setMessage(event.target.value);
            console.log(event.target.value)
        };
        const handleSubmit = (event) => {
            // Get input value from "event"
            console.log(message)
            const sInput = window.document.querySelector('.searchInput')
            setMessage('')
        };
        

        return(
            <div>
                <p>this is search</p>
                    <label />
                    Search:
                    <input className="searchInput" type="text" value={message} name='message' onChange={handleChange}/>
                    <input type="submit" value="Submit" onClick={handleSubmit}/>
            </div>
           
        )
}

