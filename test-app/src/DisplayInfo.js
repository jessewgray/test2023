import React, {Component} from 'react'

class DisplayInfo extends Component{

    render(){

        const stArray = []
        let getData = function(){

            fetch('http://localhost:5000/get')
                    .then(response => response.json())
                    .then(data => {
                       //console.log(data.dbArray);
                       data.dbArray.map((x) => {
                            //console.log(x)
                            stArray.push(x)
                       })
                       logThis();
                    })
                    .catch(error => console.error(error));
                   
            }()

            const logThis = function(){
                const listObj = stArray.map((anything) => {
                    let theName = anything.name;
                    let theComment = anything.comment;
                    let theLI = `<li key={theName.toString()}>the name is ${theName} and the comment is: ${theComment}</li>`
                    const theUL = window.document.querySelector('.theList')
                    theUL.insertAdjacentHTML('afterend', theLI)
                })
            }
            
           
          

        return(
            <div>
                <p>this is the return from the api</p>
                <div className="showData">
                    <ul className="theList"></ul>
                </div>
            </div>
            

            
        )
    }
}

export default DisplayInfo;