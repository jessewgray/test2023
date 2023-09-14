import React, {Component} from 'react'

class Title extends Component{
    render(){

        const titleStyle = {
            'color': '#00ff00', 
            'textShadow': '3px 3px 3px black', 
            'marginTop':'10px',
            'marginBottom':'20px', 
            'fontFamily': 'Permanent Marker, cursive', 
            'fontSize':'50px', 'letterSpacing': '3px'
        }

        return(
            <div>
                <h1 style={titleStyle}>Messenger Pigeon</h1>
            </div>
        )
    }
}

export default Title;

