import React, {Component} from 'react';

import AddNew from '../AddNew.js'
import DisplayInfo from '../DisplayInfo';


class Home extends Component {
    render(){
        return(
            <div>
                <p>this is the home page</p>
                <AddNew />
                <DisplayInfo />
            </div>
        )
    }
}

export default Home;