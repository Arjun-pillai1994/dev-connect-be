const express = require('express');
const authRouter = express.Router();
const {validateSignup, validateLogin} = require('../utils/validation');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const crypto = require("node:crypto");





authRouter.post('/signup', async (req, res) => {
  console.log('Request body:', req.body);
  
      try {
       validateSignup(req);
       const {password, firstName, lastName, email} = req.body;
       const passwordHash = await bcrypt.hash(password, 10);
       const user = new User({firstName,lastName, email, password: passwordHash});
       user.save().then(() => {
       res.status(201).send('User created successfully');
     }).catch((err) => {
      res.status(500).send('Error creating user: ' + err.message);
     });
     } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('' + error);
    }
})


authRouter.post('/login', async(req, res) => {
  try {

    const {email, password} = req.body;
     const user = await User.findOne({email})
     validateLogin({email, password, savedEmail: user.email, savedPassword: user.password});
      console.log({"user": user})
    
     const isPasswordvalid = await user.validatePassword(password);
      if (!isPasswordvalid) {
        throw new Error('Password is not valid')
      }
      const token = await user.getJWT();

      res.cookie("token", token)

     res.status(200).send('Successfully logged in')

  }
  catch (error){
    res.status(500).send('Error:'+ error.message)
  }
})


authRouter.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });     
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Generate a password reset token and send it to the user's email
       const token = crypto.randomBytes(32).toString('hex');
       console.log("token", token);
       //send email to user with token
       const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        user.passwordResetToken = tokenHash;
     const val =   await user.save();
     console.log("val", val)
    // Send the token to the user's email (implementation not shown)
    // await sendResetPasswordEmail(email, token);

    res.status(200).send('Password reset email sent');
  } catch (error) {
    res.status(500).send('Error:' + error.message);
  }
});


authRouter.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword, token } = req.body;

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({email, passwordResetToken: tokenHash})
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isPasswordValid = await user.validatePassword(newPassword);
    if (isPasswordValid) {
      return res.status(400).send('New password cannot be the same as the old password');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.password = newPasswordHash;
    user.resetpasswordToken = undefined;
    await user.save();

    res.status(200).send('Password reset successfully');

  }
  catch (error) {
    res.status(500).send('Error:'+ error.message)
  }

});


authRouter.post('/logout', (req, res) => {
   res.clearCookie('token');
   res.status(200).send('Successfully logged out');
})

module.exports = authRouter;