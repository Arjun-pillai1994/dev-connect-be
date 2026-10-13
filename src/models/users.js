const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
   firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
     if (!validator?.isEmail(value)) {
        throw new Error('Email is not valid')
     }
    }
  },
  password: {
    type: String,
    required: true
  },
   age: {
    type: Number,
   },
   photoUrl: {
    type: String,
    default: 'https://example.com/default-profile.png'
   },
   gender: {
    type: String,
    validate(value) {
      if(!['male', 'female', 'other'].includes(value)) {
        throw new Error('Invalid gender');
      }
    }
  },
  skills: {
    type: [String],
    validate(value) {
       if (value?.length>6) {
         throw new Error('Only 6 skills are allowed');
       }
    }
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  }
}, {timestamps: true}) 


userSchema.methods.getJWT = async function getJWT() {
  const token = await jwt.sign({_id: this._id}, "dev@connect", {expiresIn: '7d'})
  return token
}

userSchema.methods.validatePassword = async function validatePassoword(password) {
  const isPasswordValid = await bcrypt.compare(password, this.password);

  return isPasswordValid;
}

module.exports = mongoose.model('User', userSchema);


