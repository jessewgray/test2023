import React, {Component} from 'react'

import Logo from './Logo';
import Header from '../pages/Header'
import Title from './Title'


class HeaderWrap extends Component{
    render(){

        const headerWrapStyle = {
            'textAlign':'center', 
            'backgroundColor': '#ffb3e1', 
            'paddingTop': '40px', 
            'paddingBottom': '30px',
            'boxShadow': '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
        }

        return(
            <div style={headerWrapStyle} className='container'>
                <div className='row'>
                    <div className='col-md-2'>
                        <Logo />
                    </div>
                    <div className='col-md-7'>
                       <Title />
                    </div>
                    <div className='col-md-3'>
                        <Header />
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderWrap;