const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
   username: {
      type: String
   },
   password: {
      type: String
   },
   email: {
      type: String
   },
   name: {
      type: String
   }
}, {
   collection: 'users_db'
})

module.exports = mongoose.model('User', User)