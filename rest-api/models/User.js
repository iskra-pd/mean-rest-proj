const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/**
* Data collection
*/
let UsersSchema = new Schema({
   username: {
      type: String
   },
   email: {
      type: String
   },
   name: {
      type: String
   },
   	hash: {
		type: String
	},
	salt: {
		type: String
	},
}, {
   collection: 'users_db'
})

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

/**
* Generate json web token 
*/
UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 1);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}


UsersSchema.methods.toAuthJSON = function() {
  return {
			username: this.username,
			name: this.name,
			email: this.email
		};
};

module.exports = mongoose.model('User', UsersSchema)