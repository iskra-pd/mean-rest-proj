const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoute = express.Router();
const passport  =  require('passport');
const LocalStrategy  =  require('passport-local').Strategy;
const auth = require('./auth');

// User model
let User = require('../models/User');

userRoute.route('/login').post((req, res,next) => {
  const user = req.body;

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
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).info;
  })(req, res, next);
});


// Get All Users
userRoute.route('/users').get((req, res) => {
  User.find({},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json({users:[data]})
    }
  })
})

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