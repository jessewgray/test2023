
import { useState, useEffect } from 'react';

export default function Search(){

    const [message, setMessage] = useState('');
    
 
   
        
        useEffect(() => {
            //fetch('http://localhost:8080/get')
            fetch('https://backend-pigeon.azurewebsites.net/get')
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
            filterThis(message)
        };

        let x = document.querySelectorAll('.aComment')
        function filterThis(words){
        for (let i = 0; i< x.length; i++){
            if(!x[i].outerText.includes(words)){
                let y = x[i]
                y.style.display = 'none'
            }
        }
}
        
        const searchWrapStyle = {
            'width':'90%',
            'margin':'auto'
        }
        const searchStyle = {
            'display':'block',
            'width': '100%',
            'margin': 'auto',
            'padding': '5px'
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
                <div className='searchWrap' style={searchWrapStyle}>
                    <label className='theLabel'>
                        Search:
                    </label>
                    <input className="searchInput" style={searchStyle} type="text" value={message} name='message' onChange={handleChange}/>
                    <div className="submitWrap">
                        <input type="submit" value="Search" style={inputStyle} onClick={handleSubmit}/>
                    </div>
                    
                </div>
            </div>
        )
}

