import React, {Component} from 'react';

import AddNew from '../AddNew.js'
import DisplayInfo from '../DisplayInfo';
import Header from './Header.js'




class Home extends Component {
    render(){ 
        return(
            <div>
                <Header/>
                <p>this is the home page</p>
                <AddNew />
                <DisplayInfo />
            </div>
        )
    }
}

export default Home;