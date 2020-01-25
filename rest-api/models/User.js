const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Define collection and schema
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
	//console.log('salt',crypto.randomBytes(16).toString('hex'));
	//var salt= crypto.randomBytes(16).toString('hex');
	//console.log('Hash',crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex'))
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}


UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
	username: this.username,
    email: this.email,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model('User', UsersSchema)