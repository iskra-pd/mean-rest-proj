const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoute = express.Router();
const passport  =  require('passport');
const LocalStrategy  =  require('passport-local').Strategy;

/**
* REST API
*/

let User = require('../models/User');

/**
* POST  {username: string, password: string} to /api/login
* successful response returns format {user:{username:string, token: string}} 
*/
userRoute.route('/login').post((req, res,next) => {
  const user = req.body;
 console.log('Login request',req.headers);
  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }	
  return passport.authenticate('local', (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      let token = passportUser.generateJWT();
	  res.status(201);
	return res.json({user: passportUser,token: token});
    }
    return res.status(401).json({
		errors: info
	});
  })(req, res, next);
});


/**
* GET /api/users
* success response returns {users:[....]} 
*/
userRoute.route('/users').get((req, res) => {
  User.find({},{hash:0,salt:0},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json({users:[data]})
    }
  })
})

/**
* GET /api/users/:username
* @param {string} username
* success response data format is {user:{username: username,name: name,email: email}}
*/
// Get single user by username
userRoute.route('/users/:username').get((req, res) => {
  User.findById(req.params.username, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json({user:data})
    }
  })
})


module.exports = userRoute;