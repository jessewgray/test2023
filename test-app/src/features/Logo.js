import React, {Component} from 'react'


class Logo extends Component{
    render(){
        return(
            <div>
                <img src={require('./pigeonLogo.png')} style={{'maxWidth': '100px'}}/>
            </div>
        )
    }
}

export default Logo;