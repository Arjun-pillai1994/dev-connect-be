const validator = require('validator');
const bcrypt = require('bcrypt')
const validateSignup = (request) => {
const {firstName, lastName, email, password} = request.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid")
  } else if (!validator?.isEmail(email)) {
    throw new Error("Email is not valid")
  } else if (!validator?.isStrongPassword(password)) {
    throw new Error("Password is not valid")
  }

}


const validateLogin =  ({email, password, savedEmail, savedPassword}) => {
    if (email !== savedEmail) {
      throw new Error("Email is not valid")
    } 
    // const isPasswordValid = await bcrypt.compare(password, savedPassword);
    // if (!isPasswordValid || !password) {
    //   throw new Error('Password is not valid')
    // }
}


const validateProfileUpdate = (request) => {

   const validFields = ['firstName', 'lastName', 'email', "age", "photoUrl", "gender", "skills"];
    const isValidUpdate = Object.keys(request.body).every((field) => validFields.includes(field));
    if (!isValidUpdate) {
      throw new Error('Invalid update fields');
    }
}

module.exports = {
validateSignup,
validateLogin,
validateProfileUpdate
}