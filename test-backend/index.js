const express = require('express')
const appBE = express()

//accepting post data
const bodyParser = require('body-parser')
appBE.use(bodyParser.urlencoded({extended:true}))
appBE.use(bodyParser.json());

const cors = require('cors')
appBE.use(cors());

appBE.use(express.json());

const mysql = require('mysql');

let thePosts = []

appBE.listen(5000, () => {
    console.log("appBE listening on port 5000")
})

appBE.get('/', (req, res) => {
    res.json({
        fname: "jesse",
        lname: "gray"
    })
})

appBE.post('/post', (req, res) => {
    res.send({
        "message": "this is working",
        "name": req.body.name,
        "comment": req.body.comment
    })
    console.log(req.body)
    let aName = req.body.name;
    let aComment = req.body.comment
    
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'userComment'
    });
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let stringValueName = "'" + aName + "'"
        let stringValueComment = "'" + aComment + "'"
        let sql = "INSERT INTO userComment.comments(name, comment) VALUES (" + stringValueName + "," + stringValueComment + ")";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });

})

appBE.get('/get', (req, res) => {

    dbArray = []

    const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'userComment'
    });
    connection.connect(function(err) {
        if (err) throw err;
        console.log("get Connected!");
        let sql = "SELECT * FROM userComment.comments";
        connection.query(sql, function (err, result, fields) {
          if (err) throw err;
          //console.log(result[0].name);
            
          result.forEach(element => {
            console.log(element.name + ',' + element.comment)
            let nextObj = {name:element.name, comment: element.comment}
            dbArray.push(nextObj)
          });

          res.json({
            dbArray
       })
          
        });
      });

})



//express session and cookie parser have not been used yet


  appBE.post('/auth', function(req, res) {
	// Capture the input fields
	let username = req.body.username;
	let password = req.body.password;
   
	// Ensure the input fields exists and are not empty
    console.log(username + ', ' + password)
    res.send({
        "message": "this is working",
    })
    
    if (username && password) {

        // db connection
        const connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            database: 'userComment'
        });


        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            let sql = 'SELECT * FROM userComment.accounts WHERE username = "' + username + '" AND password = "' + password +'"'
            console.log(sql)
            connection.query(sql, [username, password], function (err, result, fields) {
              if (err) throw err;

              if(result.length > 0) {
                // req.session.loggedin = true;
                // req.session.username = username;
                console.log(result)
                console.log(req.session)
                //res.redirect('/home')
              }else{
                // res.send('Incorrrect un and/or pw')
                console.log('wrong pw')
              }
              res.end();
            });
          });

	} 
});