import React, {Component} from 'react';

import AddNew from '../AddNew.js'
import DisplayInfo from '../DisplayInfo';
import HeaderWrap from '../features/HeaderWrap.js';
import Search from '../Search.js'



class Home extends Component {
    render(){ 
        return(
            <div>
                <HeaderWrap/>
                <AddNew />
                <Search />
                <DisplayInfo />
            </div>
        )
    }
}

export default Home;