
const express = require('express');
const profileRouter = express.Router();
const User = require('../models/users');
const userAuth = require('../middleware/auth');
const { validateProfileUpdate } = require('../utils/validation');


profileRouter.get('/view', userAuth, async(req, res) => {
  try {
     const {_id} = req;
     const user = await User.findOne({_id});
     const response = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
     }
    res.status(200).send("profile data" + JSON.stringify(response));

  }
  catch (error){
    res.status(500).send('Error:'+ error.message)
  }
})


profileRouter.post('/edit/:id', userAuth, async(req, res) => {
  try {
     const requestData = req.body;
     validateProfileUpdate(req);
     const loggedInUser = req.user;

     Object.keys(req.body).forEach((key) => (loggedInUser[key] = requestData[key]));
      await loggedInUser.save();
      res.status(200).send("Profile updated successfully");

  }
  catch (error){
    res.status(500).send('Error:'+ error.message)
  }
})

module.exports = profileRouter;