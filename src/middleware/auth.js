
const jwt = require('jsonwebtoken');
const User = require('../models/users');


const userAuth = async (req, res, next) => {
  try {
 const {token} = req.cookies;
   if (!token) {
     throw new Error('Token is invalid');
   }
   console.log("token", token)
  const decodeobj = await jwt.verify(token, 'dev@connect')
  console.log("decodeobj", decodeobj)
  req._id = decodeobj._id;
   const user = await User.findOne({_id: decodeobj._id});
   console.log("user", user)
  if(!decodeobj || !user) {
    res.status(401).send('Unauthorized')
  }
  req.user = user;
  next();
  } catch (error) {
    res.status(401).send('Unauthorized')
  }
 
}


module.exports = userAuth;