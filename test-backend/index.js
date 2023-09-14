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

///////////////////////////

appBE.post('/post', (req, res) => {
    res.send({
        "image": req.body.image,
        "name": req.body.name,
        "comment": req.body.comment,
        "time": req.body.time
    })
    console.log(req.body)
    let aImage = req.body.image;
    let aName = req.body.name;
    let aComment = req.body.comment;
    let aTime = req.body.time;
    
    // const connection = mysql.createConnection({
    //     host: '127.0.0.1',
    //     user: 'root',
    //     password: 'password',
    //     database: 'userComment'
    // });
    // connection.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //     let stringValueImage = "'" + aImage + "'"
    //     let stringValueName = "'" + aName + "'"
    //     let stringValueComment = "'" + aComment + "'"
    //     let stringValueTime = "'" + aTime + "'"
    //     let sql = "INSERT INTO userComment.comments(image, username, comment, time) VALUES (" + stringValueImage + ", " + stringValueName + "," + stringValueComment + "," + stringValueTime + ")";
    //     connection.query(sql, function (err, result) {
    //       if (err) throw err;
    //       console.log("1 record inserted");
    //     });
    //   });

    const connection = mysql.createConnection({
        host: 'sql9.freemysqlhosting.net',
        user: 'sql9646444',
        password: 'tWF67lbQMf',
        database: 'sql9646444'
    });
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let stringValueName = "'" + aName + "'"
        let stringValueComment = "'" + aComment + "'"
        let stringValueTime = "'" + aTime + "'"
        let sql = "INSERT INTO sql9646444.comments(username, comment, time) VALUES (" + stringValueName + "," + stringValueComment + "," + stringValueTime + ")";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });

})

////////////////////////////////////

appBE.get('/get', (req, res) => {

    dbArray = []

    // const connection = mysql.createConnection({
    //     host: '127.0.0.1',
    //     user: 'root',
    //     password: 'password',
    //     database: 'userComment'
    // });
    // connection.connect(function(err) {
    //     if (err) throw err;
    //     console.log("get Connected!");
    //     let sql = "SELECT * FROM userComment.comments";
    //     connection.query(sql, function (err, result, fields) {
    //       if (err) throw err;
    //       //console.log(result[0].name);
            
    //       result.forEach(element => {
    //         let nextObj = {image: element.image, name: element.username, comment: element.comment, time: element.time}
    //         console.log(nextObj)
    //         dbArray.push(nextObj)
    //       });
    //       dbArray.reverse()
    //       res.json({
    //         dbArray
    //    })
          
    //     });
    //   });


    const connection = mysql.createConnection({
      host: 'sql9.freemysqlhosting.net',
      user: 'sql9646444',
      password: 'tWF67lbQMf',
      database: 'sql9646444'
    });
  connection.connect(function(err) {
      if (err) throw err;
      console.log("get Connected!");
      let sql = "SELECT * FROM sql9646444.comments";
      connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        //console.log(result[0].name);
          
        result.forEach(element => {
          let nextObj = {name: element.username, comment: element.comment, time: element.time}
          console.log(nextObj)
          dbArray.push(nextObj)
        });
        dbArray.reverse()
        res.json({
          dbArray
     })
        
      });
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

        // db connection
        // const connection = mysql.createConnection({
        //     host: '127.0.0.1',
        //     user: 'root',
        //     password: 'password',
        //     database: 'userComment'
        // });


        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //     let sql = 'SELECT * FROM userComment.accounts WHERE username = "' + username + '" AND password = "' + password +'"'
        //     console.log(sql)
        //     connection.query(sql, [username, password], function (err, result, fields) {
        //       if (err) throw err;

        //       if(result.length > 0) {
        //         req.session.loggedin = true;
        //         req.session.username = username;
        //         console.log(result)
        //         console.log(req.session)
        //         res.send({loggedin: req.session.loggedin, username: req.session.username})
        //         console.log('we made it to here')
        //       }else{
        //         console.log('wrong pw')
        //         res.send({"message": "didn't get logged in"});
        //       }
        //       res.end();
        //     });
        //   });


      const connection = mysql.createConnection({
        host: 'sql9.freemysqlhosting.net',
        user: 'sql9646444',
        password: 'tWF67lbQMf',
        database: 'sql9646444'
      });


      connection.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          let sql = 'SELECT * FROM sql9646444.accounts WHERE username = "' + username + '" AND password = "' + password +'"'
          console.log(sql)
          connection.query(sql, [username, password], function (err, result, fields) {
            if (err) throw err;

            if(result.length > 0) {
              req.session.loggedin = true;
              req.session.username = username;
              console.log(result)
              console.log(req.session)
              res.send({loggedin: req.session.loggedin, username: req.session.username})
              console.log('we made it to here')
            }else{
              console.log('wrong pw')
              res.send({"message": "didn't get logged in"});
            }
            res.end();
          });
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
  // const connection = mysql.createConnection({
  //   host: '127.0.0.1',
  //   user: 'root',
  //   password: 'password',
  //   database: 'userComment'
  // });
  // connection.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  //   let stringValueEmail = "'" + theEmail + "'"
  //   let stringValueUserName = "'" + theUserName + "'"
  //   let stringValuePassword = "'" + thePassword + "'"
  //   let sql = "INSERT INTO userComment.accounts(username, password, email) VALUES (" + stringValueUserName + "," + stringValuePassword + "," + stringValueEmail + ")";
  //   connection.query(sql, function (err, result) {
  //     if (err) throw err;
  //     console.log("1 record inserted");
  //   });
  // });

    const connection = mysql.createConnection({
      host: 'sql9.freemysqlhosting.net',
      user: 'sql9646444',
      password: 'tWF67lbQMf',
      database: 'sql9646444'
    });
    connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      let stringValueUserName = "'" + theUserName + "'"
      let stringValuePassword = "'" + thePassword + "'"
      let stringValueEmail = "'" + theEmail + "'"
      let stringValueImage = "'" + theImage + "'"
      let sql = "INSERT INTO sql9646444.accounts(username, password, email, image) VALUES (" + stringValueUserName + "," + stringValuePassword + "," + stringValueEmail + ", " + stringValueImage + ")";
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });

})

///////////////

// appBE.get('/newdb', (req, res) => {
//   console.log('working')
//   const connection = mysql.createConnection({
//     host: 'sql9.freemysqlhosting.net',
//     user: 'sql9646444',
//     password: 'tWF67lbQMf',
//     database: 'sql9646444'
//   });
//   connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     let sql = 'SELECT * FROM sql9646444.accounts'
//     console.log(sql)
//     connection.query(sql, function (err, result, fields) {
//       if (err) throw err;

//       if(result.length > 0) {
//         console.log(result)
//         console.log('we made it to here')
//       }else{
//         console.log('wrong pw')
//       }
//       res.end();
//     });
//   });


// })