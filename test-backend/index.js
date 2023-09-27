const express = require('express');
const appBE = express();
const sessions = require('express-session');

//accepting post data
const bodyParser = require('body-parser')
appBE.use(bodyParser.urlencoded({extended:true}))
appBE.use(bodyParser.json());

const cors = require('cors')
appBE.use(cors());

appBE.use(express.json());

const mysql = require('mysql');

const cookieParser = require('cookie-parser');

const oneDay = 1000 * 60 * 60 * 24;
appBE.use(sessions({
    secret: 'secretkey',
    saveUninitialized: true,
    cookie: {maxAge:oneDay},
    resave:false
}));

appBE.use(cookieParser());

const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9646444',
    password : 'tWF67lbQMf',
    database : 'sql9646444',
    debug    :  false
});


let thePosts = []

appBE.listen(8080, () => {
    console.log("appBE listening on port 8080")
})

appBE.get('/', (req, res) => {
    res.json({
        fname: "jesse",
        lname: "gray"
    })
})

///////////////////////////

appBE.post('/post', (req, res) => {
    res.send({
       // "image": req.body.image,
        "name": req.body.name,
        "comment": req.body.comment,
        "time": req.body.time
    })
    console.log(req.body)
    //let aImage = req.body.image;
    let aName = req.body.name;
    let aComment = req.body.comment;
    let aTime = req.body.time;
    

    
    let stringValueName = "'" + aName + "'"
    let stringValueComment = "'" + aComment + "'"
    let stringValueTime = "'" + aTime + "'"
    let sql = "INSERT INTO sql9646444.comments(username, comment, time) VALUES (" + stringValueName + "," + stringValueComment + "," + stringValueTime + ")";
    

    pool.query(sql ,(err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        console.log(data);
    });
     
})

////////////////////////////////////

appBE.get('/get', (req, res) => {

    dbArray = []

    let sql = "SELECT * FROM sql9646444.comments";
    pool.query(sql ,(err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        console.log(data);

        data.forEach(element => {
            let nextObj = {name: element.username, comment: element.comment, time: element.time}
            console.log(nextObj)
            dbArray.push(nextObj)
          });
          dbArray.reverse()
          res.json({
            dbArray
       })
    });

})
/////////////////////////

//express session and cookie parser have not been used yet

let session;

  appBE.post('/auth', function(req, res) {
	// Capture the input fields
	let username = req.body.username;
	let password = req.body.password;
 
    
	// Ensure the input fields exists and are not empty
    console.log(username + ', ' + password)
    // res.send({
    //     "message": "this is working",
    // })
    
    if (username && password) {

        let sql = 'SELECT * FROM sql9646444.accounts WHERE username = "' + username + '" AND password = "' + password +'"'
        pool.query(sql, [username, password], (err, data) => {
            if(err) {
                console.error(err);
                return;
            }
            // rows fetch
            console.log(data);
            //console.log('works to here')

            if(data.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                console.log(data)
                console.log(req.session)
                res.send({loggedin: req.session.loggedin, username: req.session.username})
                console.log('we made it to here')
              }else{
                console.log('wrong pw')
                res.send({"message": "didn't get logged in"});
              }
              res.end();
        });

	} 
});


/////////////////

appBE.get('/auth', function(req, res) {
    let logSession = req.session
    res.json({
        log:logSession
    })
})

////////

appBE.get('/endsession', function(req, res) {
    req.session.destroy();
    let nowSession = req.session
    let nowBody = req.body
    res.send({
        body:nowBody,
        loggedin: nowSession
    })
})


/////////////

appBE.post('/register', function(req, res) {
  res.send({
    "email": req.body.email,
    "username": req.body.username,
    "password": req.body.password
  })
  console.log(req.body)

  let theEmail = req.body.email;
  let theUserName = req.body.username;
  let thePassword = req.body.password;
  let theImage = 'no image'


    let stringValueUserName = "'" + theUserName + "'"
    let stringValuePassword = "'" + thePassword + "'"
    let stringValueEmail = "'" + theEmail + "'"
    let stringValueImage = "'" + theImage + "'"

    let sql = "INSERT INTO sql9646444.accounts(username, password, email, image) VALUES (" + stringValueUserName + "," + stringValuePassword + "," + stringValueEmail + ", " + stringValueImage + ")";
    
    pool.query(sql,(err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        console.log(data);
    });

})