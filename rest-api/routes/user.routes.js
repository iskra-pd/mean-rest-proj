const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../models/Users');


// Get All Users
userRoute.route('/users').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single user by username
userRoute.route('/users/:username').get((req, res) => {
  User.findById(req.params.username, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = userRoute;